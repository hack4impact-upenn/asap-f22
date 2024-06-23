import express from 'express';
import getDefinitionsForQuestionID from '../controllers/definition.controller';
import 'dotenv/config';

const router = express.Router();

router.get(
  '/get-definitions-for-question/:questionID',
  getDefinitionsForQuestionID,
);

export default router;
