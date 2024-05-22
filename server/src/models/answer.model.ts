/**
 * Defines the Answer model for the database and also the interface to
 * access the model in TypeScript.
 */

// This schema serves for both answers and resources. When IQuestion.isQuestion is false, resultantQuestionId will
// be empty. If IQuestion.isQuestion is true, then resourceContent will be empty.

import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  resultantQuestionId: {
    type: Number,
    required: false,
  },
  resourceContent: {
    type: String,
    required: false,
  },
  resourceLink: {
    type: String,
    required: false,
  },
});

interface IAnswer extends mongoose.Document {
  _id: number;
  text: string;
  resourceContent: string;
  resultantQuestionId: number;
  resourceLink: string;
}

const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);

export { IAnswer, Answer, AnswerSchema };
