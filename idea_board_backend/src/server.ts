import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

//import routes
import IdeaBoardRoutes from './routes/ideaBoardRoutes';

const PORT = process.env.PORT || 8000;

const app = express();

// CORS configuration
// Read allowed origin from env (set to '*' to allow all). For local development
// we default to allowing the frontend at http://localhost:3000.
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const CORS_ALLOW_CREDENTIALS = process.env.CORS_ALLOW_CREDENTIALS === 'true';

const corsOptions = CORS_ORIGIN === '*'
	? undefined
	: { origin: CORS_ORIGIN, credentials: CORS_ALLOW_CREDENTIALS };

// Middlewares
app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));
app.use(express.json());

// Health route
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

app.use('/ideas', IdeaBoardRoutes);

// Create HTTP server (so we can access the server instance if needed)
const server = http.createServer(app);

// Bind to 0.0.0.0 so the server is reachable from other containers
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
