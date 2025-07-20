// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Files (update relative paths as needed)
import connectDB from "../config/db.js";
import userRoutes from '../Routes/userRoutes.js';
import projectRoutes from '../Routes/projectRoutes.js';
import moduleRoutes from "../Routes/moduleRoutes.js";
import teamRoutes from '../Routes/teamRoutes.js';
import taskRoutes from '../Routes/taskRoutes.js';
import adminRoutes from '../Routes/adminRoutes.js';

dotenv.config();

const app = express();

// Connect to DB (only once per cold start)
connectDB();

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // or your Vercel frontend URL
    credentials: true,
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', adminRoutes);

app.get('/', (req, res) => {
    res.send("Backend is running successfully.");
});

// ✅ Export handler for Vercel serverless
export default app;
