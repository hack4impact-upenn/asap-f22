/**
 * Defines the definition model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const DefinitionSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  questionIds: {
    type: [Number],
    required: true,
  },
});

interface IDefinition extends mongoose.Document {
  _id: string;
  word: string;
  definition: string;
  questionIds: number[];
}

const Definition = mongoose.model<IDefinition>('Definition', DefinitionSchema);

export { IDefinition, Definition };
