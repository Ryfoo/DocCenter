from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .models import Profile, Post, Comment, Notification
from .serializers import ProfileSerializer, PostSerializer, CommentSerializer, UserSerializer, NotificationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True
        return Response({'liked': liked, 'likes_count': post.likes.count()})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def save(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if user in post.saved_by.all():
            post.saved_by.remove(user)
            saved = False
        else:
            post.saved_by.add(user)
            saved = True
        return Response({'saved': saved})


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


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


class ObtainAuthTokenWithUser(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({'token': token.key, 'user': UserSerializer(user).data})


def main(request):
    return Response("<h1>Hello</h1>")