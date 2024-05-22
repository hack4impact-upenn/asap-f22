/**
 * A type for encapsulating any react components/elements as children. The child
 * or children is accessed from the `children` property.
 */
export interface IAnswer {
  _id: string;
  text: string;
  resourceLink: string | undefined;
  resourceContent: string | undefined;
  resultantQuestionId: string | undefined;
}
