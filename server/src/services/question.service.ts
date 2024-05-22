/**
 * All the functions for interacting with user data in the MongoDB database
 */
// import { hash } from 'bcrypt';
import { Answer, IAnswer } from '../models/answer.model';
import { IQuestion, Question } from '../models/question.model';

// async function getAnswerObj(ansId: string) {
//   const resultantAnswer = await Answer.findById(ansId);
//   const answerObj = {
//     _id: resultantAnswer?._id,
//     text: resultantAnswer?.text,
//     resourceContent: resultantAnswer?.resourceContent,
//     resultantQuestionId: resultantAnswer?.resultantQuestionId,
//   } as IAnswer;
//   return answerObj;
// }

/**
 * Get's a question from its ID
 * @param questID the id of the desired question
 * @returns the question with the given ID or null
 */
const getQuestionById = async (questID: number) => {
  const question = await Question.findById(questID).exec();
  if (!question) {
    throw new Error('Question not found');
  }
  return question;
};

const getNextQuestionFromDB = async (answerID: number) => {
  const answer = await Answer.findById(answerID).exec();
  if (!answer) {
    throw new Error('Answer not found');
  }
  const question = await getQuestionById(answer.resultantQuestionId);
  return question;
};

/**
 * Creates a new question in the database.
 * @param text - string representing the text
 * @param isQuestion - boolean representing if question is valid
 * @returns The created {@link IQuestion}
 */
const createQuestion = async (
  _id: string,
  text: string,
  resultantAnswers: IAnswer[],
  isQuestion: boolean,
) => {
  const newQuestion = {
    _id: parseInt(_id, 10),
    text,
    resultantAnswers,
    isQuestion,
  } as IQuestion;
  const q = await Question.create(newQuestion);
  if (!q) {
    throw new Error('Question not created');
  }
  return q;
};

/**
 * @returns All the {@link IQuestion}s in the database.
 */
const getAllQuestionsFromDB = async () => {
  const questionList = await Question.find({}).exec();
  if (!questionList) {
    throw new Error('Questions not found');
  }
  return questionList;
};

/**
 * Edits the text of a question in the database. The new text is expected to be in the request body.
 */
const editQuestion = async (
  questionVals: { [key: string]: string },
  // NOTE that we are using strings for IDs here rather than the Answer Interface.
  answerVals: { [key: string]: string },
) => {
  const qID = Object.keys(questionVals)[0];
  const qText = questionVals[qID];

  const newq = await Question.findByIdAndUpdate(qID, [
    { $set: { text: qText } },
  ]).exec();
  if (!newq) {
    throw new Error('Question not found');
  }
  // do we need to check for isQuestion? if it's false answerVals will just be empty.
  if (!newq.isQuestion) {
    throw new Error('Invalid question');
  }
  Object.keys(answerVals).forEach(async (key) => {
    await Answer.findByIdAndUpdate(key, [
      { $set: { text: answerVals[key] } },
    ]).exec();
  });
};

export {
  createQuestion,
  getQuestionById,
  getAllQuestionsFromDB,
  editQuestion,
  getNextQuestionFromDB,
};
