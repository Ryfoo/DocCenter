Deployment guide — split hosting (Frontend on Vercel/Netlify, Backend on Render)

Overview
- Frontend: static site built by Vite -> deploy to Vercel or Netlify 
- Backend: Django REST API deployed to Render 

Preflight (local)
1. Build frontend locally to verify:

```bash
cd frontend
npm ci
npm run build
```

2. Ensure backend works with production-like env vars locally:

```powershell
& .venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
setx DJANGO_DEBUG False
setx DJANGO_SECRET_KEY "<a-strong-secret>"
# optionally set DATABASE_URL to a Postgres instance for local test
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
python backend/manage.py runserver
```

Backend (Render)
1. Create a new Web Service on Render (https://render.com).
2. Connect your Git repository (the repo containing this project).
3. Set the build and start commands (Render will run these):

- Build command (optional pre-step to build frontend or required server deps):

```
# install python deps and build frontend
pip install -r backend/requirements.txt
cd frontend
npm ci
npm run build
cd ..
python backend/manage.py migrate
python backend/manage.py collectstatic --noinput
```

- Start command:

```
gunicorn backend.wsgi --bind 0.0.0.0:$PORT
```

4. Environment variables (set in Render dashboard):
- `DJANGO_SECRET_KEY` — required
- `DJANGO_DEBUG` — set to `False`
- `DJANGO_ALLOWED_HOSTS` — comma-separated hostnames (e.g., example.onrender.com,yourdomain.com)
- `DATABASE_URL` — provided by Render's managed Postgres if using it
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME` — if using S3 for media

5. Static and media files
- `collectstatic` must run during the build. With `whitenoise` enabled, static files are served by Django via WhiteNoise.
- Media (user uploads) should be stored in S3 or another persistent store. Configure `AWS_*` env vars and set up an S3 bucket.

Frontend (Vercel or Netlify)
1. Create a new site on Vercel or Netlify and connect your repo.
2. Set build command and output directory:

- Build command: `npm ci && npm run build`
- Output directory: `dist`

3. Set environment variables for the frontend (in site settings):
- `VITE_API_URL` — set to your Render API base URL, e.g., `https://your-app.onrender.com/api/`

4. Deploy — the platform will build and publish your static site.

Domain and HTTPS
- Both Render and Vercel/Netlify provide automatic TLS (Let's Encrypt) for connected domains.
- Point your DNS A/ALIAS/CNAME records to the provider per their docs.

Notes & Security
- Never commit `DJANGO_SECRET_KEY` or credential files to the repo.
- Use Postgres for production via `DATABASE_URL` and `dj-database-url` parsing (already supported in `settings.py`).
- Use S3 for uploads (configure `django-storages` and `boto3` environment variables).

Optional: Docker
- If you prefer to run on a VPS, I can add a `Dockerfile` and `docker-compose.yml` that:
  - Builds frontend and copies `dist` into Django static files
  - Runs `gunicorn` behind `nginx`

If you want, I can:
- Create a `render.yaml` or `Procfile` and a small `README` with exact commands for Render + Vercel.
- Add a `Dockerfile` + `docker-compose.yml` for VPS deployments.
Which should I prepare next? (Render config, Docker files, or deploy the frontend to Vercel example?)