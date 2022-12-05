import express from 'express';
import {
  getQuestionWithID,
  getNextQuestion,
} from '../controllers/question.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/get-next-question/:answerID', getNextQuestion);

router.get('/get-question/:questionID', getQuestionWithID);

export default router;
