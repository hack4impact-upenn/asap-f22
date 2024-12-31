import Mongoose from 'mongoose';
import { IAnswer, Answer } from '../models/answer.model';
import { Question } from '../models/question.model';

const getAnswerById = async (answerID: string) => {
  const answer = await Answer.findById(
    new Mongoose.Types.ObjectId(answerID),
  ).exec();
  if (!answer) {
    throw new Error('Answer not found');
  }
  return answer;
};

const deleteAnswerById = async (answerID: string) => {
  const answer = await Answer.findByIdAndDelete(
    new Mongoose.Types.ObjectId(answerID),
  ).exec();
  if (!answer) {
    throw new Error('Answer not found');
  }

  // Remove the Answer from all Questions that reference it
  await Question.updateMany(
    { 'resultantAnswers._id': answerID },
    { $pull: { resultantAnswers: { _id: answerID } } },
  ).exec();

  return answer;
};

const editAnswerById = async (newAnswer: IAnswer) => {
  const answerId = new Mongoose.Types.ObjectId(newAnswer._id);

  // Update the Answer document
  const answer = await Answer.findByIdAndUpdate(
    answerId,
    {
      text: newAnswer.text,
      resultantQuestionId: newAnswer.resultantQuestionId,
      resourceContent: newAnswer.resourceContent,
      resourceLink: newAnswer.resourceLink,
    },
    { new: true },
  ).exec();

  if (!answer) {
    throw new Error('Answer not found');
  }

  // Update the embedded Answer in all related Questions
  await Question.updateMany(
    { 'resultantAnswers._id': answerId },
    {
      $set: {
        'resultantAnswers.$[elem].text': newAnswer.text,
        'resultantAnswers.$[elem].resourceContent': newAnswer.resourceContent,
        'resultantAnswers.$[elem].resourceLink': newAnswer.resourceLink,
      },
    },
    {
      arrayFilters: [{ 'elem._id': answerId }], // Update only the matching Answer in the array
    },
  ).exec();

  return answer;
};

const getAllResourcesFromDB = async () => {
  const answers = await Answer.find({ resultantQuestionId: null }).exec();
  if (!answers) {
    return [];
  }
  return answers;
};

export {
  getAnswerById,
  deleteAnswerById,
  editAnswerById,
  getAllResourcesFromDB,
};
