# Notes App

A simple full-stack notes application with an Express + MongoDB backend and a React + Vite frontend. The app supports creating, reading, updating and deleting notes, and includes request rate limiting using Upstash (Redis).

Short description
- A lightweight notes service exposing a REST API at `/api/notes` and a React UI to manage notes.

Key features
- RESTful API for notes (CRUD).
- Rate limiting backed by Upstash Redis.
- CORS configured for the local frontend (http://localhost:5173).

Architecture
- Backend: Node.js, Express, Mongoose (MongoDB), Upstash rate limiter.
- Frontend: React + Vite, Axios for API calls, Tailwind/DaisyUI for styles.

Getting started (development)

Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (set `MONGO_URI`)
- Upstash Redis credentials (optional; used by rate limiter)

Backend
1. Change to the backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in `backend` (use `.env.example` as a template):

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
NODE_ENV=development
```

4. Run the backend in development:

```
npm run dev
```

The server listens by default on the port from `PORT` (fallback 5001) and mounts the notes routes at `/api/notes`.

Frontend
1. Change to the frontend folder:

```
cd frontend
```

2. Install dependencies and run the dev server:

```
npm install
npm run dev
```

The frontend dev server runs on Vite's default port (`http://localhost:5173`). The backend CORS is configured to allow this origin.

Deployment on Render
1. Deploy the backend as a Web Service:
   - Connect your GitHub repo
   - Set environment variables in Render dashboard:
     - `MONGO_URI`: Your MongoDB connection string
     - `PORT`: 5001 (or leave auto)
     - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: Your Upstash credentials
     - `FRONTEND_URL`: Your frontend Render URL (e.g., `https://my-frontend.onrender.com`)
     - `NODE_ENV`: `production`
   - Note the backend URL (e.g., `https://my-backend.onrender.com`)

2. Deploy the frontend as a Static Site or Web Service:
   - Connect your GitHub repo
   - Add environment variable: `VITE_API_URL=https://my-backend.onrender.com/api`
   - For Web Service: Build: `npm install && npm run build`, Start: (empty for static)

API Endpoints
- `GET /api/notes` — list all notes
- `GET /api/notes/:id` — get a single note
- `POST /api/notes` — create a new note
- `PUT /api/notes/:id` — update a note
- `DELETE /api/notes/:id` — delete a note

Helpful files
- `backend/src/server.js` — backend entrypoint and app configuration
- `backend/src/routes/notesRoutes.js` — API routes
- `backend/src/config/db.js` — MongoDB connection (uses `MONGO_URI`)
- `backend/src/config/upstash.js` — rate limiter using Upstash Redis
- `frontend/src` — React source code

Notes on environment variables
- `MONGO_URI`: MongoDB connection string used by Mongoose.
- Upstash Redis: `@upstash/redis` reads connection info from environment variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`).
- `PORT`: optional backend port (defaults to `5001`).

Rate Limiting
- Per-IP sliding window: 100 requests per 20 seconds
- Applied only to `/api/notes` routes
- If Upstash is unavailable, requests are allowed (fail-open behavior)

Troubleshooting
- **429 "Too Many Requests"**: Wait a few seconds before retrying, or check that Upstash Redis credentials are correct.
- **net::ERR_CONNECTION_REFUSED**: Backend is not running or frontend can't reach it. Check:
  - Backend is running locally: `npm run dev` in `backend/`
  - In production: Set `VITE_API_URL` on frontend and `FRONTEND_URL` on backend
  - CORS is enabled: `frontend.onrender.com` must match `FRONTEND_URL` on backend
- **Cannot connect to MongoDB**: Verify `MONGO_URI` is valid and your IP is whitelisted in MongoDB Atlas.

Contributing
- Feel free to open issues or create PRs. Keep changes focused and include simple tests where applicable.

License
- MIT (or choose a license appropriate for your project).
