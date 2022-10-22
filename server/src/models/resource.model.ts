/**
 * Defines the Answer model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

interface IResource extends mongoose.Document {
  _id: string;
  title: string;
  information: string;
}

const Resource = mongoose.model<IResource>('Resource', ResourceSchema);

export { IResource, Resource };
