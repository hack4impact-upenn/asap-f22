import express from 'express';
import StatusCode from '../util/statusCode';
import ApiError from '../util/apiError';
import getResourceFromDB from '../services/resource.service';

const getResource = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { answerID } = req.params;
  return (
    getResourceFromDB(answerID)
      .then((resource) => {
        res.status(StatusCode.OK).send(resource);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve next question'));
      })
  );
};

export default getResource;
