import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import apiRoutes from './routes/apiRoutes';
import authRoutes from './routes/authRoutes';
import { connectToDatabase } from './config/dbConfig';
import './config/passportConfig';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Session setup (required for Passport)
app.use(session({
  secret: process.env.JWT_SECRET as string,
  resave: false,
  saveUninitialized: true,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
connectToDatabase()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
});