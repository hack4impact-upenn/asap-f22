import express from 'express';
import getAnswer from '../controllers/answer.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/get-answer/:answerID', getAnswer);

export default router;
