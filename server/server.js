import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './Router/userRouter.js';
import assessmentRouter from './Router/assessmentRouter.js';

const app = express();
const port = process.env.PORT || 5000;
connectDB(); // database connection
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

// API End points

app.use('/api/user', userRouter);
app.use('/api/test', assessmentRouter);

app.get('/', (req,res)=>{
  res.send("Server is Working");
})

app.listen(port, ()=>{ console.log("Server is listening on port:", port)})
