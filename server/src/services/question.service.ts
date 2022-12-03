/**
 * All the functions for interacting with user data in the MongoDB database
 */
// import { hash } from 'bcrypt';
import { IAnswer } from '../models/answer.model';
import { IQuestion, Question } from '../models/question.model';

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
  //    const hashedPassword = await hash(password, passwordHashSaltRounds);
  //    if (!hashedPassword) {
  //      return null;
  //    }
  const newQuestion = new Question({
    _id,
    text,
    resultantAnswers,
    isQuestion,
  });
  const user = await newQuestion.save();
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
 * Gets a question from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link IQuestion} or null if the user was not found.
 */
const getQuestionById = async (id: string) => {
  const question = await Question.findById(id).exec();
  return question;
};

/**
 * @returns All the {@link IQuestion}s in the database.
 */
const getAllQuestionsFromDB = async () => {
  const questionList = await Question.find({}).exec(); // .select(removeSensitiveDataQuery).exec();
  return questionList;
};

//  /**
//   * A function that edits a question
//   * @param question The updated IQuestion
//   * @returns nothing?
//   */

const editQuestion = async (question: IQuestion) => {
  const qID = question._id;
  // eslint-disable-next-line prettier/prettier
  await Question.findOneAndReplace({ _id : qID}, question).exec();
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
  //    deleteUserById,
};
