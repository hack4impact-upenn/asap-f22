import express from 'express';
import StatusCode from '../util/statusCode';
import ApiError from '../util/apiError';
import { getDefinitionsForQuestionFromDB } from '../services/definition.service';

const getDefinitionsForQuestionID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionID } = req.params;
  return (
    getDefinitionsForQuestionFromDB(questionID)
      .then((nextQuestion) => {
        res.status(StatusCode.OK).send(nextQuestion);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

export default getDefinitionsForQuestionID;
