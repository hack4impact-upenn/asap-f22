/**
 * All the controller functions containing the logic for routes relating to
 * admin users such as getting all users, deleting users and upgrading users.
 */
import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import { IUser } from '../models/user.model';
import {
  upgradeUserToAdmin,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserById,
} from '../services/user.service';
import {
  editQuestion,
  getAllQuestionsFromDB,
} from '../services/question.service';
import {
  getAllDefinitionsFromDB,
  editDefinitionById,
  deleteDefinitionById,
} from '../services/definition.service';
import {
  getAllResourcesFromDB,
  editAnswerById,
  deleteAnswerById,
} from '../services/answer.service';

/**
 * Get all users from the database. Upon success, send the a list of all users in the res body with 200 OK status code.
 */
const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllUsersFromDB()
      .then((userList) => {
        res.status(StatusCode.OK).send(userList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all users'));
      })
  );
};

/**
 * Upgrade a user to an admin. The email of the user is expected to be in the request body.
 * Upon success, return 200 OK status code.
 */
const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }
  if (user.admin) {
    next(ApiError.badRequest(`User is already an admin`));
    return;
  }

  upgradeUserToAdmin(user._id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to upgrade user to admin.'));
    });
};

/**
 * Delete a user from the database. The email of the user is expected to be in the request parameter (url). Send a 200 OK status code on success.
 */
const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.params;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  // Check if user to delete is an admin
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }

  const reqUser: IUser | undefined = req.user as IUser;
  if (reqUser.email === user.email) {
    next(ApiError.badRequest('Cannot delete self.'));
    return;
  }
  if (user.admin) {
    next(ApiError.forbidden('Cannot delete an admin.'));
    return;
  }

  deleteUserById(user._id)
    .then(() => res.sendStatus(StatusCode.OK))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Failed to delete user.'));
    });
};

/**
 * Get all questions from the database. Upon success, send the a list of all questions in the res body with 200 OK status code.
 */
const getAllQuestions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllQuestionsFromDB()
      .then((questionList) => {
        res.status(StatusCode.OK).send(questionList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all questions'));
      })
  );
};

/**
 * Edits the text of a question in the database. The new text is expected to be in the request body.
 */
const editQuestionText = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { question } = req.body;
  if (!question) {
    next(ApiError.missingFields(['question']));
    return;
  }

  editQuestion(question)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to edit question text.'));
    });
};

const getAllDefinitions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllDefinitionsFromDB()
      .then((definitionList) => {
        res.status(StatusCode.OK).send(definitionList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all definitions'));
      })
  );
};

const editDefinition = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { definition } = req.body;
  if (!definition) {
    next(ApiError.missingFields(['definition']));
    return;
  }

  editDefinitionById(definition)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to edit definition.'));
    });
};

const deleteDefinition = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }

  deleteDefinitionById(id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to delete definition.'));
    });
};

const getAllResources = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllResourcesFromDB()
      .then((resourceList) => {
        res.status(StatusCode.OK).send(resourceList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all resources'));
      })
  );
};

const editResource = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { resource } = req.body;
  if (!resource) {
    next(ApiError.missingFields(['resource']));
  }

  editAnswerById(resource)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to edit resource.'));
    });
};

/**
 * Delete a resource answer object from the database. The id of the resource is expected to be in the request parameter (url). Send a 200 OK status code on success.
 */
const deleteResource = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
  }

  deleteAnswerById(id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to delete resource.'));
    });
};

export {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
  getAllQuestions,
  editQuestionText,
  getAllDefinitions,
  editDefinition,
  deleteDefinition,
  getAllResources,
  editResource,
  deleteResource,
};
