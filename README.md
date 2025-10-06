 # Idea Board — Quick start

 This project contains a Next.js frontend and an Express backend with Prisma/Postgres.

 Minimal steps to run locally with Docker Compose:

 1. Copy the example env and edit if needed:

 ```bash
 cp .env.example .env
 # edit .env if you need to change ports or DB credentials
 ```

 2. Start everything (detached):

 ```bash
 docker-compose up --build -d
 ```

 3. Tail logs (optional):

 ```bash
 docker-compose logs -f frontend
 docker-compose logs -f backend
 ```

 4. Stop and remove containers:

 ```bash
 docker-compose down
 ```

 Quick notes:
 - Open the frontend at: http://localhost:3000
 - Backend API (if you need it directly): http://localhost:8000
 - If API requests fail due to CORS, copy `.env.example` to `.env` and ensure `NEXT_PUBLIC_API_BASE_URL` is set to `http://localhost:8000`, then rebuild the frontend image with `--build`.

Developer (no Docker)
----------------------
If you prefer to run services locally without Docker (fast edit/test loop), follow these steps.

Backend (local):

1. Copy the example env and edit `idea_board_backend/.env` as needed (or create `.env` in the backend folder). At minimum set a `DATABASE_URL` pointing to a running Postgres instance, e.g. `postgres://postgres:postgres@localhost:5432/idea_board_db`.

2. Install and run the backend in dev mode:

```bash
cd idea_board_backend
npm ci
npm run dev
```

3. If you changed the schema, run Prisma migrate (dev flow):

```bash
cd idea_board_backend
npx prisma migrate dev
```

Frontend (local):

1. Ensure the backend is running at `http://localhost:8000` (or set the URL you use below).

2. Install and run the frontend in dev mode, making sure the client knows the backend URL (Next.js requires `NEXT_PUBLIC_` vars for client code):

```bash
cd idea_board_frontend
npm ci
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```
