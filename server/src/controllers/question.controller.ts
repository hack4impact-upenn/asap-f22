import express from 'express';
import StatusCode from '../util/statusCode';
import ApiError from '../util/apiError';
import {
  getNextQuestionFromDB,
  getQuestionById,
} from '../services/question.service';

const getNextQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { answerID } = req.params;
  const id = parseInt(answerID, 10);
  return (
    getNextQuestionFromDB(id)
      .then((nextQuestion) => {
        res.status(StatusCode.OK).send(nextQuestion);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        console.log(e);
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

const getQuestionWithID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionID } = req.params;
  const id = parseInt(questionID, 10);
  return (
    getQuestionById(id)
      .then((nextQuestion) => {
        // console.log(nextQuestion);
        res.status(StatusCode.OK).send(nextQuestion);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        console.log(e);
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

export { getNextQuestion, getQuestionWithID };
