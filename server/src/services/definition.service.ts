import { Definition } from '../models/definition.model';

const getDefinitionsForQuestionFromDB = async (questionID: string) => {
  console.log(questionID);
  const definitions = await Definition.find({ questionIds: questionID }).exec();
  console.log(definitions);
  return definitions;
};

export default getDefinitionsForQuestionFromDB;
