import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

//import routes
import IdeaBoardRoutes from './routes/ideaBoardRoutes';

const PORT = process.env.PORT;

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

// Health route
app.get('/health', (_req: Request, res: Response) => {
	res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

app.use('/ideas', IdeaBoardRoutes);

// Create HTTP server (so we can access the server instance if needed)
const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server listening on http://127.0.0.1:${PORT}`);
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
