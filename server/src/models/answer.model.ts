/**
 * Defines the Answer model for the database and also the interface to
 * access the model in TypeScript.
 */

// This schema serves for both answers and resources. When IQuestion.isQuestion is false, resultantQuestionId will
// be empty. If IQuestion.isQuestion is true, then resourceContent will be empty.

import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  resultantQuestionId: {
    type: mongoose.Types.ObjectId,
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
  _id: mongoose.Types.ObjectId;
  text: string;
  resultantQuestionId: mongoose.Types.ObjectId | null;
  resourceContent: string | null;
  resourceLink: string | null;
}

const Answer = mongoose.model<IAnswer>('Answer', AnswerSchema);

export { IAnswer, Answer, AnswerSchema };
