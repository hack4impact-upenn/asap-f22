import Mongoose from 'mongoose';
import { Definition } from '../models/definition.model';

const getDefinitionsForQuestionFromDB = async (questionID: string) => {
  const definitions = await Definition.find({
    questionIds: new Mongoose.Types.ObjectId(questionID),
  }).exec();
  if (!definitions) {
    return [];
  }
  console.log(definitions);
  return definitions;
};

export default getDefinitionsForQuestionFromDB;
