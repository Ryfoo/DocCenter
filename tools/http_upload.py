import requests
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.core.management import execute_from_command_line

# we will run this using python manage.py shell execution so Django is configured
User=get_user_model()
user=User.objects.get(username='filetester')
try:
    token=Token.objects.get(user=user)
except:
    token=Token.objects.create(user=user)
url='http://127.0.0.1:8000/api/posts/'
headers={'Authorization':f'Token {token.key}'}
with open('temp_upload.txt','rb') as f:
    files={'media': f}
    data={'title':'httpfile','body':'uploaded via requests','is_published':'true'}
    r=requests.post(url, headers=headers, files=files, data=data)
    print(r.status_code)
    print(r.text)
