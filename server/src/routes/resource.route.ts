import express from 'express';
import getResource from '../controllers/resource.controller';
import 'dotenv/config';

const router = express.Router();

router.get('/get-resource/:answerID', getResource);

export default router;
