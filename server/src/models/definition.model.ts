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
  link: {
    type: String,
    required: false,
  },
  questionIds: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
});

interface IDefinition extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  word: string;
  definition: string;
  link: string;
  questionIds: mongoose.Types.ObjectId[];
}

const Definition = mongoose.model<IDefinition>('Definition', DefinitionSchema);

export { IDefinition, Definition };
