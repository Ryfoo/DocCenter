import os
import django
import json
import sys


def run():
    # Ensure the project package is importable
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if project_dir not in sys.path:
        sys.path.insert(0, project_dir)
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()

    from django.test import Client

    client = Client()

    print('1) Registering user...')
    resp = client.post('/api/auth/register/', {'username': 'tester', 'email': 'tester@example.com', 'password': 'testpass'})
    print('status', resp.status_code, resp.content)
    data = json.loads(resp.content.decode() or '{}')
    token = data.get('token')

    if not token:
        print('Register may have failed or user exists, attempting login...')
        resp = client.post('/api/auth/token/', {'username': 'tester', 'password': 'testpass'})
        print('token status', resp.status_code, resp.content)
        try:
            data = json.loads(resp.content.decode())
            token = data.get('token')
        except Exception:
            token = None

    if not token:
        print('Could not obtain token; aborting smoke tests.')
        return

    print('Token obtained:', token[:8], '...')

    auth_headers = {'HTTP_AUTHORIZATION': f'Token {token}'}

    print('2) Creating a post...')
    resp = client.post('/api/posts/', {'title': 'Hello World', 'body': 'This is a test post.'}, **auth_headers)
    print('create post status', resp.status_code, resp.content)
    post = None
    try:
        post = json.loads(resp.content.decode())
    except Exception:
        pass
    post_id = post.get('id') if post else None

    if not post_id:
        print('Failed to create post; aborting further actions.')
        return

    print('3) Commenting on post...')
    resp = client.post('/api/comments/', {'post': post_id, 'body': 'Nice post!'}, **auth_headers)
    print('comment status', resp.status_code, resp.content)

    print('4) Liking post...')
    resp = client.post(f'/api/posts/{post_id}/like/', {}, **auth_headers)
    print('like status', resp.status_code, resp.content)

    print('5) Fetching posts list...')
    resp = client.get('/api/posts/')
    print('list status', resp.status_code)
    try:
        posts = json.loads(resp.content.decode())
        print('posts count', len(posts))
    except Exception:
        print('could not parse posts list')


if __name__ == '__main__':
    run()
