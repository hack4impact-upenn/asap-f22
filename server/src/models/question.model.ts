/**
 * Defines the question model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';
import { IAnswer, AnswerSchema } from './answer.model';

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  resultantAnswers: {
    type: [AnswerSchema],
    required: true,
  },
  isQuestion: {
    type: Boolean,
    required: true,
  },
});

interface IQuestion extends mongoose.Document {
  _id: string;
  text: string;
  resultantAnswers: [IAnswer];
  isQuestion: boolean;
}

const Question = mongoose.model<IQuestion>('FIXTHISQuestion', QuestionSchema);

export { IQuestion, Question };
