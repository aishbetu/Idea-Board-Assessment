# Idea Board — Local Development README

This repository contains two apps and the DB used by the Idea Board project:

- `idea_board_backend` — Express + TypeScript backend (Prisma + PostgreSQL)
- `idea_board_frontend` — Next.js frontend

This README explains how to run the entire stack locally using Docker Compose, the environment variables used, how to run migrations, and common troubleshooting steps. It's written for a developer who is new to this repo.

## Quick start (recommended)

Prerequisites:

- Docker (Desktop or Engine) installed and running
- docker-compose (bundled with modern Docker Desktop)

From the repository root (where this README and `docker-compose.yml` live), run:

```bash
docker-compose up --build
```

This will build the frontend and backend images and start three services:

- frontend → http://localhost:3000
- backend → http://localhost:8000 (health: http://localhost:8000/health)
- postgres → listens on container port 5432 and mapped to host 5432

To stop the services, press Ctrl+C in the terminal running docker-compose, then run:

```bash
docker-compose down
```

If you want to remove volumes (data will be lost):

```bash
docker-compose down -v
```

## Environment variables and .env

The docker-compose file sets a DATABASE_URL for the backend service. If you prefer to use a `.env` file at the repository root, you can create one and override values. Example keys used by the stack:

`.env` example (create at repo root if you want custom values):

```ini
# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=idea_board_db

# Backend
PORT=8000
# DATABASE_URL will typically look like:
# DATABASE_URL=postgres://<user>:<password>@db:5432/<db>

# Frontend (Next.js) - used at build time if you wire it into Dockerfile
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Notes:
- The compose file already injects DATABASE_URL into the backend service as: `postgres://postgres:postgres@db:5432/idea_board_db`.
- Next.js reads `NEXT_PUBLIC_` env vars at build time. If you need the frontend to point to the backend service in the container network, set `NEXT_PUBLIC_API_URL=http://backend:8000` when building inside Docker. See "Build-time vars for frontend" below.

## Prisma / database migrations

The backend uses Prisma with PostgreSQL. The Docker build for the backend runs `prisma generate`, but it does not automatically apply migrations to the DB on container startup.

After `docker-compose up --build` has started the containers, run the following to apply migrations (one-time):

```bash
# Run migration from inside the backend container
docker-compose run --rm backend npm run prisma:migrate
```

If you prefer non-interactive deployment of already-created migrations, run:

```bash
docker-compose run --rm backend npx prisma migrate deploy
```

If you just want to push the schema without migrations (useful during development):

```bash
docker-compose run --rm backend npm run prisma:push
```

Important: migrations require the database service to be running. If the `db` container takes a few seconds to be healthy, re-run the commands after it is ready.

## Dev workflows (without Docker)

If you want to run services locally without containers (for faster iteration):

Backend (local dev):

1. cd into `idea_board_backend`
2. Create `.env` with a DATABASE_URL pointing at a running Postgres (or create a local Postgres)
3. Install and run in dev:

```bash
cd idea_board_backend
npm ci
npm run dev
```

Frontend (local dev):

1. cd into `idea_board_frontend`
2. Install and run:

```bash
cd idea_board_frontend
npm ci
npm run dev
```

Note: when running locally you must ensure the frontend knows where the backend API is (set `NEXT_PUBLIC_API_URL` locally or use proxying). For example, in development run:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000 npm run dev
```

## Build-time vars for frontend

Next.js reads `NEXT_PUBLIC_` environment variables at build time, so if you want the Docker-built frontend to include a different API URL, you should:

1. Update `idea_board_frontend/Dockerfile` to accept a build ARG and set an ENV before `npm run build`. Example snippet to add early in the Dockerfile:

```dockerfile
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
```

2. Pass the build arg through docker-compose (the provided `docker-compose.yml` includes a build arg placeholder). Or build manually:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=http://backend:8000 -t idea_board_frontend ./idea_board_frontend
```

If you don't do this, the built frontend might use a default that expects the API at `http://localhost:8000`.

## Common troubleshooting

- Q: Backend container fails saying it cannot connect to DB
  - A: The DB container may not be ready; either wait and retry migrations or add a small wait-for script to the backend entrypoint. You can also check DB logs with `docker-compose logs db`.

- Q: Port 5432 is already in use on host
  - A: If you have a local Postgres running, change or remove the port mapping in `docker-compose.yml` for the `db` service (or stop the local Postgres). Removing `ports` for `db` keeps it internal to Docker network.

- Q: Frontend shows incorrect API URL after container build
  - A: Ensure `NEXT_PUBLIC_API_URL` is passed at build time (see Build-time vars section) or run frontend in dev with the correct env.

- Q: Prisma `migrate dev` asks for a non-empty database or creates a shadow DB failure
  - A: Use `prisma migrate deploy` in CI or when you already have migrations, or use `prisma db push` during early development if you don't need migration history.

## Useful docker-compose commands

- Start (build first):

```bash
docker-compose up --build
```

- Start detached:

```bash
docker-compose up -d --build
```

- View logs for a service (example: backend):

```bash
docker-compose logs -f backend
```

- Run a one-off command in the backend service (example: open a shell):

```bash
docker-compose run --rm backend sh
```

- Stop and remove containers (and optionally volumes):

```bash
docker-compose down
docker-compose down -v  # removes volumes
```

## Optional additions (recommended enhancements)

- Add an entrypoint script to the backend Dockerfile that waits for the DB (`pg_isready`) and optionally runs `prisma migrate deploy` before starting the server. This makes startup smoother.
- Modify the frontend Dockerfile to accept a build arg `NEXT_PUBLIC_API_URL` and set it as an ENV before running `npm run build`.
- Add an Adminer or pgAdmin service to `docker-compose.yml` for easy DB inspection.

## Where to look next in the repo

- Backend code: `idea_board_backend/src`
- Backend Dockerfile: `idea_board_backend/Dockerfile`
- Backend Prisma schema: `idea_board_backend/prisma/schema.prisma`
- Frontend code: `idea_board_frontend/app` and `idea_board_frontend/(components)`
- Frontend Dockerfile: `idea_board_frontend/Dockerfile`

---

If you'd like, I can implement the two small improvements mentioned above (backend entrypoint that waits for the DB and runs migrations, and frontend Dockerfile build ARG wiring) and update `docker-compose.yml` accordingly. Tell me which you'd like me to add and I'll make the changes.
