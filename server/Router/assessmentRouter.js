import express from 'express'
import { getAssessmentStatus, submitAssessment } from '../controller/assessmentController.js';
import userAuth from '../Middleware/userAuth.js';

const assessmentRouter = express.Router();

assessmentRouter.post('/assessment' , userAuth, submitAssessment);
assessmentRouter.get('/status' , userAuth, getAssessmentStatus);

export default assessmentRouter;