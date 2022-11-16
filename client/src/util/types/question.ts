/**
 * A type for encapsulating any react components/elements as children. The child
 * or children is accessed from the `children` property.
 */

import { IAnswer } from './answer';

export interface IQuestion {
  _id: string;
  text: string;
  resultantAnswerIds: string[];
  isQuestion: boolean;
}
