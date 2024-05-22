/**
 * Defines the question model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';
import { Answer, IAnswer } from './answer.model';

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  resultantAnswers: {
    type: [Answer.schema],
    required: true,
  },
  isQuestion: {
    type: Boolean,
    required: true,
  },
});

interface IQuestion {
  _id: number;
  text: string;
  resultantAnswers: [IAnswer];
  isQuestion: boolean;
}

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export { IQuestion, Question };
