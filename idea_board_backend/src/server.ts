import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

//import routes
import IdeaBoardRoutes from './routes/ideaBoardRoutes';

const PORT = process.env.PORT || '8000';

const app = express();

// CORS configuration (safe defaults)
// - If CORS_ORIGIN is unset or set to '*', allow any origin (useful for quick dev).
// - If CORS_ORIGIN is a specific origin, restrict to that origin and optionally enable credentials.
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const CORS_ALLOW_CREDENTIALS = process.env.CORS_ALLOW_CREDENTIALS === 'true';

if (!CORS_ORIGIN || CORS_ORIGIN === '*') {
	// Allow all origins
	app.use(cors());
} else {
	// Restrict to a single origin (required if you need credentials)
	app.use(cors({ origin: CORS_ORIGIN, credentials: CORS_ALLOW_CREDENTIALS }));
}

app.use(express.json());

// Health route
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

app.use('/ideas', IdeaBoardRoutes);

// Create HTTP server (so we can access the server instance if needed)
const server = http.createServer(app);

// Bind to 0.0.0.0 so the server is reachable from other containers when running in Docker
server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown helpers
function shutdown(signal: string) {
	console.log(`Received ${signal}, shutting down server...`);
	server.close(() => {
 		console.log('Server closed');
 		process.exit(0);
 	});
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export { app, server };
