import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './Router/userRouter.js';
import assessmentRouter from './Router/assessmentRouter.js';
import paymentRouter from './Router/paymentRouter.js';
import taskRouter from './Router/taskRoutes.js';
import subscriptionRouter from './Router/subscriptionRouter.js';
import resourceRouter from './Router/resourceRouter.js';
import resourceModel from './models/resourceModel.js';
import { seedResources } from './controller/resourceController.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect DB middleware for serverless environment
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, origin || true);
      } else {
        callback(null, origin);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'token', 'Authorization', 'user-id'],
  })
);

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/test', assessmentRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/dashboard', taskRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/resources', resourceRouter);

app.get('/', (req, res) => {
  res.send("Nirvanic Server is Working");
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log("Server is listening on port:", port);
  });
}

export default app;
