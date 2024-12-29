/**
 * All the functions for interacting with question data in the MongoDB database
 */
import mongoose from 'mongoose';
import { Answer, IAnswer } from '../models/answer.model';
import { IQuestion, Question } from '../models/question.model';

/**
 * Get's a question from its ID
 * @param questID the id of the desired question
 * @returns the question with the given ID or null
 */
const getQuestionById = async (questID: mongoose.Types.ObjectId) => {
  const question = await Question.findById(questID).exec();
  if (!question) {
    throw new Error('Question not found');
  }
  return question;
};

const getNextQuestionFromDB = async (answerID: string) => {
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
    _id: new mongoose.Types.ObjectId(_id),
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

const editQuestion = async (question: IQuestion) => {
  // create new answer IDs with this new content
  const newAnswerIDs: mongoose.Types.ObjectId[] = [];
  question.resultantAnswers.forEach(async (ans: IAnswer) => {
    if (ans._id == null) {
      const newAnswer = await Answer.create(ans);
      newAnswerIDs.push(newAnswer._id);
    } else {
      newAnswerIDs.push(ans._id);
    }
  });

  const newQuestion = {
    _id: question._id,
    text: question.text,
    resultantAnswers: newAnswerIDs,
    isQuestion: question.isQuestion,
  };

  // update question with new content and new answerIDs
  await Question.replaceOne({ _id: question._id }, newQuestion).exec();
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

/**
 * A function that deletes a question from the database.
 * @param id The id of the question to delete.
 * @returns The deleted {@link Question}
 */
const deleteQuestionById = async (id: mongoose.Types.ObjectId) => {
  const question = await Question.findByIdAndDelete(id).exec();
  return question;
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
  deleteQuestionById,
};
