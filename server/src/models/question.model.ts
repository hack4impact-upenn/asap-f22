/**
 * Defines the question model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  resultantAnswerIds: {
    type: [String],
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
  resultantAnswerIds: string[];
  isQuestion: boolean;
}

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export { IQuestion, Question };
