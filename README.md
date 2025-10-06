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

Architecture & Flow
-------------------
This section gives a compact overview of how the backend and frontend communicate, the main data model, and how the client code fetches/updates data.

Backend (API)
- Stack: Express + TypeScript, Prisma (Postgres)
- Main model (Prisma):

	model Idea {
		id        Int      @id @default(autoincrement())
		title     String   @db.VarChar(280)
		upvotes   Int      @default(0)
		createdAt DateTime @default(now())
	}

- Endpoints (base path: `/ideas`):
	- GET `/ideas?page=<n>&pageSize=<m>`
		- Response: 200 { ideas: Idea[], page, pageSize, total, totalPages }
		- Purpose: list ideas with pagination (default pageSize = 10)
	- POST `/ideas/new`
		- Request body: { title: string }
		- Response: 201 created Idea object (id, title, upvotes, createdAt)
		- Validation: title must be 2..280 chars (zod)
	- PUT `/ideas/upvote/:id`
		- Response: 200 { message: "upvoted successfully", id, upvotes }
		- Errors: 400 for bad id, 404 if idea not found

Frontend (flow)
- API client: `idea_board_frontend/lib/api.ts` — axios instance using `process.env.NEXT_PUBLIC_API_BASE_URL` as baseURL.
	- Make sure `NEXT_PUBLIC_API_BASE_URL` is set at build time (for production) or exported when running `next dev`.
- State management: Redux Toolkit slice `idea_board_frontend/store/slices/IdeaSlice.ts` exposes thunks:
	- `fetchIdeas({page, append})` — GET `/ideas` and either replace or append results.
	- `createIdea(title)` — POST `/ideas/new`, then refresh page 1.
	- `upvoteIdea(id)` — PUT `/ideas/upvote/:id` and optimistically increment upvotes in the local state.
- Hooks used by UI:
	- `useIdeasList()` — mounts and dispatches `fetchIdeas({ page: 1 })`, provides `loadMore()`, `refresh()`, `handleUpvote(id)`.
	- `useCreateIdea()` — wraps createIdea and refresh behavior, returns submit status and error.
- Components (high-level):
	- `ListIdeas` — renders the list, uses `useIdeasList` for infinite scroll and load-more.
	- `AddIdea` — form to submit new idea, uses `useCreateIdea`.
	- `Idea` — single idea card with upvote button (calls `handleUpvote`).

Typical client flow examples
- Initial page load:
	1. `ListIdeas` mounts → `useIdeasList` dispatches `fetchIdeas({ page: 1, append: false })`.
	2. Backend returns paginated ideas → store updates and UI renders.
- Create idea:
	1. `AddIdea` submits title → `createIdea(title)` thunk posts to `/ideas/new`.
	2. On success the hook dispatches `fetchIdeas({ page: 1, append: false })` to show the new item.
- Upvote:
	1. `Idea` calls `handleUpvote(id)` → `upvoteIdea(id)` thunk sends PUT; the slice optimistically increments the upvote count on success.

Edge cases & notes
- Pagination: the backend returns `totalPages` and `total`; frontend uses these to stop infinite-loading when `page >= totalPages`.
- Validation errors and network errors are propagated via rejected thunks and surfaced in `state.error` for UI.
- CORS: if the browser blocks API requests, ensure `NEXT_PUBLIC_API_BASE_URL` points to the host URL (`http://localhost:8000`) when running the frontend in the browser.