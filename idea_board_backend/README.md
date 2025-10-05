# Idea Board Backend

Lightweight Express + TypeScript backend using Prisma (Postgres). This README explains how to run the app locally, with Docker, environment variables, endpoints and example requests.

## Quick facts
- Language: TypeScript
- Framework: Express
- ORM: Prisma (Postgres datasource)
- Entry point: `src/server.ts` -> built output `dist/server.js`
- Default backend port (Docker): 8000 (set in `Dockerfile`)

## Environment variables
The app reads configuration from environment variables. Most important:

- `PORT` (optional) - port the server listens on. Default in Docker: `8000`. Locally you can set to any free port (e.g. `8000`).
- `DATABASE_URL` - required by Prisma. A typical Postgres connection string looks like:

  postgres://USER:PASSWORD@HOST:PORT/DATABASE

Store your local env vars in a `.env` file (this repo excludes `.env` from the Docker image).

## Database / Prisma
This project uses Prisma with a Postgres datasource (see `prisma/schema.prisma`).

Developer workflow (local):

1. Make sure Postgres is running and `DATABASE_URL` is set.
2. Generate Prisma client (already run in CI/Docker build):

   npm run prisma:generate

3. Run migrations or push schema as needed (choose what fits your workflow):

   npm run prisma:migrate   # interactive dev migrations
   npm run prisma:push      # push schema to DB (non-migration)

Note: The Dockerfile generates the Prisma client during the build stage. The container does not run migrations automatically.

## Endpoints
Base path: `/ideas`

1) Create idea
- Method: POST
- Path: `/ideas/new`
- Body (JSON): { "title": "something clever" }
- Success: 201 Created -> returns created Idea object
- Validation: title must be a string between 2 and 280 chars

Example request:

  POST /ideas/new
  Content-Type: application/json

  { "title": "Bring back office plants" }

Example response (201):

  {
    "id": 1,
    "title": "Bring back office plants",
    "upvotes": 0,
    "createdAt": "2025-10-05T..."
  }

2) List ideas (paginated)
- Method: GET
- Path: `/ideas`
- Query params: `page` (default 1), `pageSize` (default 10)
- Success: 200 OK -> { ideas: Idea[], page, pageSize, total, totalPages }

Example: `GET /ideas?page=2&pageSize=5`

3) Upvote an idea
- Method: PUT
- Path: `/ideas/upvote/:id`
- Success: 200 -> { message: 'upvoted successfully', id, upvotes }

Example: `PUT /ideas/upvote/7`

## Run locally
Requirements: Node 18+ (the project dependencies require Node >=18), Postgres for the DB, and `DATABASE_URL` set.

1. Install dependencies:

   npm ci

2. Create `.env` with your `DATABASE_URL` (and optional `PORT`)

3. Generate Prisma client and build TypeScript:

   npm run prisma:generate
   npm run build

4. Start the server:

   npm start

For development with hot reload:

   npm run dev

## Docker
Build and run the image (example):

1. Build image:

   docker build -t idea_board_backend:latest .

2. Run container (provide `DATABASE_URL` and map ports). The Dockerfile defaults to port `8000` to avoid colliding with a frontend running on `3000`:

   docker run --rm -e DATABASE_URL="postgres://USER:PASS@host:5432/dbname" -e PORT=8000 -p 8000:8000 idea_board_backend:latest

Notes:
- The Docker image is multi-stage: it builds the Prisma client and TypeScript in a builder stage, then copies production artifacts into a slim runtime image.
- Keep your production `DATABASE_URL` secure — use Docker secrets or your orchestration platform's secret management.

## Suggestions / Next steps
- Add an optional entrypoint script to run `prisma migrate deploy` or `prisma db push` on container start for automated initialization (use only for development or controlled environments).
- Add a `docker-compose.yml` for local development that brings up Postgres + the backend and maps the correct env vars.
- Add basic tests (supertest) for endpoints.

## Contact / Maintainers
This README was generated automatically from the project structure. If any endpoints or env vars change, update this README accordingly.
