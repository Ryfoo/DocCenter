from django.contrib.auth import get_user_model
from django.test import Client
from rest_framework.authtoken.models import Token
from api.models import Post
User=get_user_model()

user,created=User.objects.get_or_create(username='filetester',defaults={'email':'filetester@example.com'})
if created:
    user.set_password('pass1234')
    user.save()
try:
    token=Token.objects.get(user=user)
except:
    token=Token.objects.create(user=user)
# create a small dummy file
with open('temp_upload.txt','wb') as f:
    f.write(b'hello world')

c=Client()
with open('temp_upload.txt','rb') as f:
    headers={'HTTP_AUTHORIZATION':f'Token {token.key}'}
    data={'title':'filetest','body':'body text','is_published':'true'}
    # Django test client accepts FILES via files keyword but in this environment use 'data' including file
    response=c.post('/api/posts/', data, **headers, FILES={'media': f})
    print('status',response.status_code)
    print(response.content)

ps=Post.objects.filter(author=user)
for p in ps:
    print('post',p.id, p.media.name if p.media else None)
