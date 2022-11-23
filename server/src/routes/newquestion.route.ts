import express from 'express';
import getNextQuestion from '../controllers/newquestion.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/get-next-question/:answerID', getNextQuestion);

export default router;
