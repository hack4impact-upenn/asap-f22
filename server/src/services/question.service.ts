import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';

const getNextQuestionFromDB = async (answerID: string) => {
  const answer = await Answer.findById(answerID).exec();
  const nextQuestion = await Question.findById(
    answer?.resultantQuestionId,
  ).exec();
  return nextQuestion;
};

export default getNextQuestionFromDB;
