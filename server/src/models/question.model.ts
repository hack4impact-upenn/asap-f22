/**
 * Defines the question model for the database and also the interface to
 * access the model in TypeScript.
 */

import { IAnswer } from './answer.model';

interface IQuestion {
  _id: string;
  text: string;
  resultantAnswers: [IAnswer];
  isQuestion: boolean;
}

export default IQuestion;
