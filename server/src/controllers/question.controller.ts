import express from 'express';
import StatusCode from '../util/statusCode';
import ApiError from '../util/apiError';
import { getNextQuestionFromDB } from '../services/question.service';

const getNextQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { answerID } = req.params;
  return (
    getNextQuestionFromDB(answerID)
      .then((nextQuestion) => {
        res.status(StatusCode.OK).send(nextQuestion);
        // console.log('Next question', nextQuestion);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

export default getNextQuestion;
