Testing procedure for DocCenter

1) Setup (Python virtualenv)

- Activate the project's virtualenv (Windows PowerShell):

```powershell
& .venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
```

2) Run Django system checks

```powershell
python backend/manage.py check
```

3) Apply migrations and create a superuser

```powershell
python backend/manage.py migrate
python backend/manage.py createsuperuser
```

4) Start Django development server

```powershell
python backend/manage.py runserver
```

- The API will be available at `http://127.0.0.1:8000/api/`.

5) Test basic API endpoints (using `httpie` or `curl`)

- Register a user:

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ -d "username=test&email=test@example.com&password=pass1234"
```

- Obtain token (login):

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ -d "username=test&password=pass1234"
```

- Use returned token for subsequent requests (header: `Authorization: Token <token>`)

- Get posts list:

```bash
curl -H "Authorization: Token <token>" http://127.0.0.1:8000/api/posts/
```

6) Password reset flow (development)

- Request password reset (prints email to console because default is console backend):

```bash
curl -X POST http://127.0.0.1:8000/api/auth/password_reset/ -d "email=test@example.com"
```

- Look at the Django runserver console for the password-reset email which will include a URL with `uid` and `token` parameters. Extract `uid` and `token` from the printed email.

- Confirm password reset by sending `uid`, `token`, and `new_password` to the API:

```bash
curl -X POST http://127.0.0.1:8000/api/auth/password_reset_confirm/ -H "Content-Type: application/json" -d '{"uid":"<uid>","token":"<token>","new_password":"newpass123"}'
```

7) Frontend

- From the `frontend` folder, install node deps and run dev server:

```bash
cd frontend
npm install
npm run dev
```

- Ensure `VITE_API_URL` environment variable points to the Django API if not using default `http://localhost:8000/api/`.

8) Notes and troubleshooting

- The project settings use environment variables for sensitive configuration. For quick dev, defaults are provided (DEBUG=True, console email backend). For production, set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`, and a real email backend.
- If `frontend/dist` is not built, Django will warn about missing static assets; run `npm run build` in `frontend` to generate `dist` before serving static files via Django.
