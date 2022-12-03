import { Definition } from '../models/definition.model';

const getDefinitionsForQuestionFromDB = async (questionID: string) => {
  const definitions = await Definition.find({ questionIds: questionID }).exec();
  return definitions;
};

export default getDefinitionsForQuestionFromDB;
