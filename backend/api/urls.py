from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, basename='post')
router.register(r'comments', views.CommentViewSet, basename='comment')
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'notifications', views.NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.register, name='register'),
    path('auth/token/', views.ObtainAuthTokenWithUser.as_view(), name='api_token_auth'),
    path('auth/password_reset/', views.password_reset, name='password_reset'),
    path('auth/password_reset_confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('users/me/stats/', views.user_stats, name='user_stats'),
    path('users/me/', views.current_user, name='current_user'),
]