# SRIJ Talent Solutions

This workspace now contains a full-stack consultancy website scaffold based on the provided blueprint direction:

- Frontend: React + Vite
- Backend: Flask
- Database: PostgreSQL

## Project structure

- `frontend/` React application with all main pages and navigation
- `backend/` Flask API, SQLAlchemy models, and seed-ready endpoints

## Frontend pages

- Home
- Services
- Industries
- About
- Contact
- Get Started
- Careers
- Admin Login
- Admin Dashboard

## API endpoints

- `GET /api/health`
- `GET /api/services`
- `GET /api/industries`
- `GET /api/testimonials`
- `POST /api/contact`
- `POST /api/consultations`
- `GET /api/careers/jobs`
- `GET /api/careers/jobs/:id`
- `POST /api/careers/jobs/:id/apply`
- `POST /api/admin/login`
- `GET /api/admin/submissions`
- `POST /api/admin/jobs`
- `DELETE /api/admin/jobs/:id`
- `DELETE /api/admin/applications/:id`
- `GET /api/admin/applications/:id/resume`

## Admin access

- Admin login page: `/admin/login`
- Admin dashboard: `/admin/dashboard`
- Careers page: `/careers`
- Default username: `admin`
- Default password: `admin123`

Update these in `backend/.env` before using this outside local development.

## Careers flow

- If there are no job openings, the public careers page shows a "No openings right now" message.
- Admin can post jobs from the dashboard.
- Candidates can open a job, apply, and upload a resume.
- Applications and resumes are stored and visible in the admin dashboard.

## Run locally

This machine does not currently have Node.js or Python installed, so the app could not be executed here. Once installed:

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
flask --app app run --debug
```

### PostgreSQL

Create a database and update `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/srij_consultancy
```

Then initialize tables by starting the Flask app once.

## Notes

- The implementation follows the visible consultancy/staffing blueprint themes already present in the original mockup.
- If you want the content adjusted page-by-page to match the PDF exactly, send page screenshots or paste the page list and section copy.
