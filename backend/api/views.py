from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .models import Profile, Post, Comment, Notification
from .serializers import ProfileSerializer, PostSerializer, CommentSerializer, UserSerializer, NotificationSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.conf import settings

User = get_user_model()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
            # remove any existing 'liked' notification from this actor
            try:
                Notification.objects.filter(recipient=post.author, actor=user, verb='liked', target_type='post', target_id=str(post.id)).delete()
            except Exception:
                pass
        else:
            post.likes.add(user)
            liked = True
            # create notification for post author (if not liking own post)
            if post.author != user:
                try:
                    Notification.objects.create(
                        recipient=post.author,
                        actor=user,
                        verb='liked',
                        target_type='post',
                        target_id=str(post.id),
                        unread=True,
                    )
                except Exception:
                    pass
        return Response({'liked': liked, 'likes_count': post.likes.count()})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def save(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if user in post.saved_by.all():
            post.saved_by.remove(user)
            saved = False
            # remove save notification
            try:
                Notification.objects.filter(recipient=post.author, actor=user, verb='saved', target_type='post', target_id=str(post.id)).delete()
            except Exception:
                pass
        else:
            post.saved_by.add(user)
            saved = True
            # create notification for post author (if not saving own post)
            if post.author != user:
                try:
                    Notification.objects.create(
                        recipient=post.author,
                        actor=user,
                        verb='saved',
                        target_type='post',
                        target_id=str(post.id),
                        unread=True,
                    )
                except Exception:
                    pass
        return Response({'saved': saved})


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

        # create notification for the post author when a comment is created
        try:
            post = serializer.instance.post
            actor = serializer.instance.author
            if post and actor and post.author != actor:
                Notification.objects.create(
                    recipient=post.author,
                    actor=actor,
                    verb='commented',
                    target_type='post',
                    target_id=str(post.id),
                    unread=True,
                )
        except Exception:
            pass


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related('user').all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # allow filtering by user id via ?user=ID
        qs = super().get_queryset()
        user_id = self.request.query_params.get('user')
        if user_id:
            return qs.filter(user__id=user_id)
        return qs

    def perform_update(self, serializer):
        # only allow users to update their own profile
        profile = serializer.instance
        if self.request.user != profile.user:
            raise permissions.PermissionDenied("You cannot edit this profile")
        serializer.save()


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.select_related('actor', 'recipient').all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # only return notifications for the current user
        qs = super().get_queryset()
        return qs.filter(recipient=self.request.user)

    def perform_update(self, serializer):
        notif = serializer.instance
        if notif.recipient != self.request.user:
            raise permissions.PermissionDenied("Cannot modify this notification")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.recipient != self.request.user:
            raise permissions.PermissionDenied("Cannot delete this notification")
        instance.delete()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_read(self, request, pk=None):
        notif = self.get_object()
        if notif.recipient != request.user:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        notif.unread = False
        notif.save()
        return Response({'ok': True})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'username already taken'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, email=email, password=password)
    # create profile
    Profile.objects.create(user=user)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UserSerializer(user).data})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset(request):
    """Initiate password reset: accepts {'email': '<user email>'} and sends reset email to console (dev) or configured backend."""
    email = request.data.get('email')
    if not email:
        return Response({'error': 'email required'}, status=status.HTTP_400_BAD_REQUEST)
    form = PasswordResetForm(data={'email': email})
    if form.is_valid():
        # Use Django's form to send email using configured EMAIL_BACKEND
        form.save(request=request)
        return Response({'ok': True})
    return Response({'error': 'invalid email or no user'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_confirm(request):
    """Complete a password reset. Expects {'uid': uidb64, 'token': token, 'new_password': '...'}"""
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')
    if not uidb64 or not token or not new_password:
        return Response({'error': 'uid, token and new_password required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception:
        return Response({'error': 'invalid uid'}, status=status.HTTP_400_BAD_REQUEST)
    if default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({'ok': True})
    return Response({'error': 'invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthTokenWithUser(ObtainAuthToken):
    """Return token and serialized user. Allow login with username or email."""

    def post(self, request, *args, **kwargs):
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        if not username_or_email or not password:
            return Response({'non_field_errors': ['Must include username and password.']}, status=status.HTTP_400_BAD_REQUEST)

        # Try standard username authentication first
        from django.contrib.auth import authenticate

        user = authenticate(request, username=username_or_email, password=password)

        # If that fails, try treating the provided identifier as an email
        if user is None:
            try:
                u = User.objects.get(email__iexact=username_or_email)
                user = authenticate(request, username=u.username, password=password)
            except User.DoesNotExist:
                user = None

        if user is None:
            return Response({'non_field_errors': ['Unable to log in with provided credentials.']}, status=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': UserSerializer(user).data})


def main(request):
    return Response("<h1>Hello</h1>")


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request):
    """Return simple per-user stats: posts, likes, comments, saves, interactions, reach."""
    user = request.user
    # posts by user
    posts_qs = Post.objects.filter(author=user)
    posts_count = posts_qs.count()

    # likes and saves on user's posts
    likes_count = sum(p.likes.count() for p in posts_qs)
    saves_count = sum(p.saved_by.count() for p in posts_qs)

    # comments on user's posts
    comments_count = Comment.objects.filter(post__author=user).count()

    # interactions = likes + comments + saves
    interactions_count = likes_count + comments_count + saves_count

    # reach: unique users who liked or commented on user's posts
    liker_ids = set()
    for p in posts_qs:
        liker_ids.update(list(p.likes.values_list('id', flat=True)))
    commenter_ids = set(Comment.objects.filter(post__author=user).exclude(author__isnull=True).values_list('author_id', flat=True))
    unique_users = (liker_ids | set(commenter_ids)) - {user.id}
    reach_count = len(unique_users)

    return Response({
        'posts_count': posts_count,
        'likes_count': likes_count,
        'comments_count': comments_count,
        'saves_count': saves_count,
        'interactions_count': interactions_count,
        'reach_count': reach_count,
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    """Return authenticated user data and profile."""
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
        profile_data = ProfileSerializer(profile).data
    except Profile.DoesNotExist:
        profile_data = None
    return Response({'user': UserSerializer(user).data, 'profile': profile_data})