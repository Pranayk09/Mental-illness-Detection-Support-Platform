import express from 'express'
import { submitAssessment } from '../controller/assessmentController.js';
import userAuth from '../Middleware/userAuth.js';

const assessmentRouter = express.Router();

assessmentRouter.post('/assessment', userAuth ,submitAssessment);

export default assessmentRouter;