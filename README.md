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

 That's it — this README intentionally keeps details minimal. If you want a more verbose README (migrations, debugging tips, dev workflows), tell me and I'll expand it again.
