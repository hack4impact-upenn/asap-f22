import express from 'express';
import getNextQuestion from '../controllers/question.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/get-next-question/:answerID', getNextQuestion);
