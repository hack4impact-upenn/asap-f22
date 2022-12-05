/**
 * All the functions for interacting with user data in the MongoDB database
 */
// import { hash } from 'bcrypt';
// import { Answer, IAnswer } from '../models/answer.model';
// import { IQuestion, Question } from '../models/question.model';
// import { TempQuestion } from '../models/temp-question.model';
import { Resource } from '../models/resource.model';

// async function getAnswerObj(ansId: string) {
//   const resultantAnswer = await Answer.findById(ansId);
//   const answerObj = {
//     _id: resultantAnswer?._id,
//     text: resultantAnswer?.text,
//     resultantQuestionId: resultantAnswer?.resultantQuestionId,
//   } as IAnswer;
//   return answerObj;
// }

const getResourceFromDB = async (answerID: string) => {
  const resource = await Resource.findById(answerID).exec();

  return resource;
};

export default getResourceFromDB;
