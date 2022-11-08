/**
 * Interface for the question data type return from the backend
 */
interface IQuestion {
  _id: string;
  text: string;
  resultantAnswerIds: string[];
  isQuestion: boolean;
}

export default IQuestion;
