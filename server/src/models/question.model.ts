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

interface IQuestion {
  _id: mongoose.Types.ObjectId;
  text: string;
  resultantAnswers: [IAnswer];
  isQuestion: boolean;
}

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export { IQuestion, Question };
