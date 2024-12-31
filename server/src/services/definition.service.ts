import Mongoose from 'mongoose';
import { IDefinition, Definition } from '../models/definition.model';

const getDefinitionsForQuestionFromDB = async (questionID: string) => {
  const definitions = await Definition.find({
    questionIds: new Mongoose.Types.ObjectId(questionID),
  }).exec();
  if (!definitions) {
    return [];
  }
  return definitions;
};

const getDefinitionById = async (definitionID: string) => {
  const definition = await Definition.findById(
    new Mongoose.Types.ObjectId(definitionID),
  ).exec();
  if (!definition) {
    throw new Error('Definition not found');
  }
  return definition;
};

const deleteDefinitionById = async (definitionID: string) => {
  const definition = await Definition.findByIdAndDelete(
    new Mongoose.Types.ObjectId(definitionID),
  ).exec();
  if (!definition) {
    throw new Error('Definition not found');
  }
  return definition;
};

const getAllDefinitionsFromDB = async () => {
  const definitions = await Definition.find({}).exec();
  if (!definitions) {
    return [];
  }
  return definitions;
};

const editDefinitionById = async (newDefinition: IDefinition) => {
  const definitionID = new Mongoose.Types.ObjectId(newDefinition._id);
  const definition = await Definition.findByIdAndUpdate(
    definitionID,
    {
      word: newDefinition.word,
      definition: newDefinition.definition,
      link: newDefinition.link,
      questionIds: newDefinition.questionIds,
    },
    { new: true },
  ).exec();

  if (!definition) {
    throw new Error('Definition not found');
  }
  return definition;
};

export {
  getDefinitionsForQuestionFromDB,
  getDefinitionById,
  deleteDefinitionById,
  getAllDefinitionsFromDB,
  editDefinitionById,
};
