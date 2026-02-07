from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, Post, Comment, Notification

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ('user', 'bio', 'avatar', 'created_at')


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'body', 'created_at')


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    saved_by = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    saved_count = serializers.IntegerField(source='saved_by.count', read_only=True)
    banner = serializers.SerializerMethodField(read_only=True)
    excerpt = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'body', 'excerpt', 'media', 'banner', 'avatar', 'tags', 'is_published', 'created_at', 'updated_at', 'likes_count', 'saved_count', 'saved_by', 'comments')

    def get_banner(self, obj):
        request = self.context.get('request') if hasattr(self, 'context') else None
        if obj.media:
            try:
                url = obj.media.url
            except Exception:
                return None
            if request:
                return request.build_absolute_uri(url)
            return url
        return None

    def get_excerpt(self, obj):
        if not obj.body:
            return ""
        return obj.body[:200]

    def get_avatar(self, obj):
        request = self.context.get('request') if hasattr(self, 'context') else None
        try:
            profile = obj.author.profile
            if profile and profile.avatar:
                url = profile.avatar.url
                if request:
                    return request.build_absolute_uri(url)
                return url
        except Exception:
            return None
        return None


class NotificationSerializer(serializers.ModelSerializer):
    actor = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = ('id', 'recipient', 'actor', 'verb', 'target_type', 'target_id', 'unread', 'timestamp')
