/**
 * All the functions for interacting with user data in the MongoDB database
 */
// import { hash } from 'bcrypt';
import { Answer, IAnswer } from '../models/answer.model';
import IQuestion from '../models/question.model';
import { TempQuestion, ITempQuestion } from '../models/temp-question.model';

async function getAnswerObj(ansId: string) {
  const resultantAnswer = await Answer.findById(ansId);
  const answerObj = {
    _id: resultantAnswer?._id,
    text: resultantAnswer?.text,
    resourceContent: resultantAnswer?.resourceContent,
    resultantQuestionId: resultantAnswer?.resultantQuestionId,
  } as IAnswer;
  return answerObj;
}

const convertTempToQuestion = async (tempQuestion: ITempQuestion) => {
  const answerArray: IAnswer[] = [];
  if (tempQuestion != null) {
    await Promise.all(
      tempQuestion?.resultantAnswerIds.map(async (id) =>
        getAnswerObj(id).then((newAnswer) => answerArray.push(newAnswer)),
      ),
    );
  }

  const question = {
    _id: tempQuestion?._id,
    text: tempQuestion?.text,
    resultantAnswers: answerArray,
    isQuestion: tempQuestion?.isQuestion,
  } as IQuestion;

  return question;
};

const convertQuestionToTemp = (question: IQuestion) => {
  const answerIdArray: string[] = [];
  question.resultantAnswers.forEach((answer) => {
    answerIdArray.push(answer._id);
  });
  const tempQuestion = {
    _id: question._id,
    text: question.text,
    resultantAnswerIds: answerIdArray,
    isQuestion: question.isQuestion,
  } as ITempQuestion;

  return tempQuestion;
};

const getNextQuestionFromDB = async (answerID: string) => {
  const answer = await Answer.findById(answerID).exec();
  const tempQuestion = await TempQuestion.findById(
    answer?.resultantQuestionId,
  ).exec();

  if (tempQuestion != null) {
    return convertTempToQuestion(tempQuestion!);
  }
  return null;
};

/**
 * Get's a question from it's ID
 * @param questID the id of the desired question
 * @returns the question with the given ID or null
 */
const getQuestionById = async (questID: string) => {
  const tempQuestion = await TempQuestion.findById(questID).exec();
  if (tempQuestion != null) {
    return convertTempToQuestion(tempQuestion!);
  }
  return null;
};

// const passwordHashSaltRounds = 10;
//  const removeSensitiveDataQuery = [
//    '-password',
//    '-verificationToken',
//    '-resetPasswordToken',
//    '-resetPasswordTokenExpiryDate',
//  ];

//  const removeSensitiveDataQueryKeepPassword = [
//    '-verificationToken',
//    '-resetPasswordToken',
//    '-resetPasswordTokenExpiryDate',
//  ];

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
    _id,
    text,
    resultantAnswers,
    isQuestion,
  } as IQuestion;
  const newTempQuestion = convertQuestionToTemp(newQuestion);

  const user = await newTempQuestion.save();
  return user;
};

/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
//  const getUserByEmail = async (email: string) => {
//    const user = await Question.findOne({ email })
//      .select(removeSensitiveDataQuery)
//      .exec();
//    return user;
//  };

//  /**
//   * Gets a user from the database by their email and includes the password in
//   * the returned user.
//   * @param email The email of the user to get
//   * @returns The {@link User} or null if the user was not found.
//   */
//  const getUserByEmailWithPassword = async (email: string) => {
//    const user = await User.findOne({ email })
//      .select(removeSensitiveDataQueryKeepPassword)
//      .exec();
//    return user;
//  };

//  /**
//   * Gets a user from the database by their verification token but doesn't include
//   * the password in the returned user.
//   * @param verificationToken The {@link string} representing the verification token
//   * @returns The {@link User} or null if the user was not found.
//   */
//  const getUserByVerificationToken = async (verificationToken: string) => {
//    const user = await User.findOne({ verificationToken })
//      .select(removeSensitiveDataQuery)
//      .exec();
//    return user;
//  };

/**
 * @returns All the {@link IQuestion}s in the database.
 */
const getAllQuestionsFromDB = async () => {
  const tempQuestionList = await TempQuestion.find({}).exec(); // .select(removeSensitiveDataQuery).exec();
  const questionArray: IQuestion[] = [];
  if (tempQuestionList != null) {
    await Promise.all(
      tempQuestionList?.map(async (tempQuestion) =>
        convertTempToQuestion(tempQuestion).then((newQuestion) =>
          questionArray.push(newQuestion),
        ),
      ),
    );
    return questionArray;
  }
  return null;
};

//  /**
//   * A function that upgrades a certain user to an admin.
//   * @param id The id of the user to upgrade.
//   * @returns nothing?
//   */

const editQuestion = async (
  questionVals: { [key: string]: string },
  // NOTE that we are using strings for IDs here rather than the Answer Interface.
  answerVals: { [key: string]: string },
) => {
  const qID = Object.keys(questionVals)[0];
  const qText = questionVals[qID];

  await TempQuestion.findByIdAndUpdate(qID, [{ $set: { text: qText } }]).exec();

  // do we need to check for isQuestion? if it's false answerVals will just be empty.
  // for (const key in answerVals) {
  Object.keys(answerVals).forEach(async (key) => {
    await Answer.findByIdAndUpdate(key, [
      { $set: { text: answerVals[key] } },
    ]).exec();
  });
};

//  /**
//   * A function that deletes a user from the database.
//   * @param id The id of the user to delete.
//   * @returns The deleted {@link User}
//   */
//  const deleteUserById = async (id: string) => {
//    const user = await User.findByIdAndDelete(id).exec();
//    return user;
//  };

export {
  //    passwordHashSaltRounds,
  createQuestion,
  //    getUserByEmail,
  //    getUserByVerificationToken,
  getQuestionById,
  //    getUserByEmailWithPassword,
  //    getUserByResetPasswordToken,
  getAllQuestionsFromDB,
  editQuestion,
  getNextQuestionFromDB,
  //    deleteUserById,
};
