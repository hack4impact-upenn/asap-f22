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

//  /**
//   * A function that upgrades a certain user to an admin.
//   * @param id The id of the user to upgrade.
//   * @returns nothing?
//   */

const editQuestion = async (question: IQuestion) => {
  const qID = question._id;
  await Question.replaceOne({ _id: qID }, question).exec();
  // save answers too
  if (question.resultantAnswers != null) {
    question.resultantAnswers.forEach(async (answer: IAnswer) => {
      await Answer.replaceOne({ _id: answer._id }, answer).exec();
    });
  }
};

const deleteResource = async (question: IQuestion, resource: IAnswer) => {
  const qID = question._id;
  const rID = resource._id;
  // removes resource with id rID from question with id qID
  await Question.findByIdAndUpdate(
    { _id: qID },
    { $pull: { resultantAnswerIds: rID } },
  ).exec();
};

const deleteQuestion = async (question: IQuestion) => {
  const qID = question._id;
  // removes question from question db
  await Question.findByIdAndDelete(qID).exec();
};

export {
  createQuestion,
  getQuestionById,
  getAllQuestionsFromDB,
  editQuestion,
  getNextQuestionFromDB,
  deleteResource,
  deleteQuestion,
  //    deleteUserById,
};
