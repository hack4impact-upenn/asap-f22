/**
 * Interface for the question data type return from the backend
 */

import { IAnswer } from './answer';

export interface IQuestion {
  _id: string;
  text: string;
  resultantAnswers: IAnswer[];
  isQuestion: boolean;
}
