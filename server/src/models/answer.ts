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
    required: false,
  },
});

interface IAnswer extends mongoose.Document {
  _id: string;
  text: string;
  resultantQuestionId: string;
}
