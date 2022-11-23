/**
 * Defines a temporary "intermediate" question model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const TempQuestionSchema = new mongoose.Schema({
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

interface ITempQuestion extends mongoose.Document {
  _id: string;
  text: string;
  resultantAnswerIds: string[];
  isQuestion: boolean;
}

const TempQuestion = mongoose.model<ITempQuestion>(
  'Question',
  TempQuestionSchema,
);

export { ITempQuestion, TempQuestion };
