/**
 * Defines the Answer model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  resultantQuestionId: {
    type: String,
    required: true,
  },
});
 
interface IAnswer extends mongoose.Document {
  _id: number;
  text: string;
  resultantQuestionId: string;
}

const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);

export { IAnswer, Answer };
