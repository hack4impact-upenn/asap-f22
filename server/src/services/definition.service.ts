import { Definition } from '../models/definition.model';

const getDefinitionsForQuestionFromDB = async (questionID: string) => {
  console.log(questionID);
  const id = parseInt(questionID, 10);
  const definitions = await Definition.find({ questionIds: id }).exec();
  if (!definitions) {
    return [];
  }
  console.log(definitions);
  return definitions;
};

export default getDefinitionsForQuestionFromDB;
