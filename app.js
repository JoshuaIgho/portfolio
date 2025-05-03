import express from "express";
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import emailRoutes from './src/routes/emailRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/viewAllProject", (req, res) => {
  res.send('hello world');
});

app.get("/details", (req, res) => {
  res.send('details');
});

// Use emailRoutes
app.use('/api/email', emailRoutes); // Mounts routes at /api/email

// Fallback Handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});









