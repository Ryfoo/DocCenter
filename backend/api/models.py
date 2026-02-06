from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
	bio = models.TextField(blank=True)
	avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"Profile({self.user.username})"


class Post(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
	title = models.CharField(max_length=255)
	body = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	is_published = models.BooleanField(default=True)
	media = models.FileField(upload_to='post_media/', null=True, blank=True)
	tags = models.CharField(max_length=255, blank=True)
	likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
	saved_by = models.ManyToManyField(User, related_name='saved_posts', blank=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return f"Post({self.title[:40]} by {self.author.username})"


class Comment(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
	author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
	body = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['created_at']

	def __str__(self):
		author = self.author.username if self.author else 'Anonymous'
		return f"Comment(by {author} on {self.post.id})"


class Notification(models.Model):
	# Basic notification model: recipient receives a message about an actor and an object
	recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
	actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='actor_notifications')
	verb = models.CharField(max_length=100)  # e.g., 'liked', 'commented', 'followed'
	target_type = models.CharField(max_length=50, blank=True)
	target_id = models.CharField(max_length=100, blank=True)
	unread = models.BooleanField(default=True)
	timestamp = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return f"Notification(to={self.recipient.username} verb={self.verb} actor={self.actor.username if self.actor else 'None'})"
