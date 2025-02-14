import express, { Application } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import { connectToDatabase } from './config/dbConfig';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
app.use(cors());
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

connectToDatabase().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
});
