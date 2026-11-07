import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middlewares/error.middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 1. Security & Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' } // Allow serving static files
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 2. Serve the uploads folder statically (useful for testing)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 3. Routes will be mounted here in the next steps

// 4. 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// 5. Global Error Handler
app.use(errorHandler);

export default app;