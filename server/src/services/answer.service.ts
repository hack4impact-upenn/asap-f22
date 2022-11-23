import { Answer } from '../models/answer.model';

const getAnswerFromDB = async (answerID: string) => {
  const answer = await Answer.findById(answerID).exec();
  return answer;
};

export default getAnswerFromDB;
