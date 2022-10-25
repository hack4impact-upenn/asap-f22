/**
 * Defines the resource model for the database and also the interface to
 * access the model in TypeScript.
 */

import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  information: {
    type: String,
    required: true,
  },
});

interface IResource extends mongoose.Document {
  _id: string;
  information: string;
}

const Resource = mongoose.model<IResource>('Resource', ResourceSchema);

export { IResource, Resource };
