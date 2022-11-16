import express from 'express';
import StatusCode from '../util/statusCode';
import ApiError from '../util/apiError';
import getAnswerFromDB from '../services/answer.service';

const getAnswer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { answerID } = req.params;
  return (
    getAnswerFromDB(answerID)
      .then((answer) => {
        res.status(StatusCode.OK).send(answer);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

export default getAnswer;
