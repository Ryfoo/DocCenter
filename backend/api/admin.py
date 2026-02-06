from django.contrib import admin
from .models import Profile, Post, Comment

from .models import Notification


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'created_at')
	search_fields = ('user__username', 'user__email')


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	list_display = ('title', 'author', 'created_at', 'is_published')
	list_filter = ('is_published',)
	search_fields = ('title', 'body', 'author__username')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
	list_display = ('post', 'author', 'created_at')
	search_fields = ('post__title', 'author__username', 'body')


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
	list_display = ('recipient', 'verb', 'actor', 'unread', 'timestamp')
	list_filter = ('unread',)
	search_fields = ('recipient__username', 'actor__username', 'verb')
