/**
 * Specifies the middleware and controller functions to call for each route
 * relating to admin users.
 */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware';
import {
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
} from '../controllers/admin.controller';
import { isAuthenticated } from '../controllers/auth.middleware';
import { approve } from '../controllers/auth.controller';
import 'dotenv/config';

const router = express.Router();

/**
 * A GET route to get all users. Checks first if the requestor is a
 * authenticated and is an admin.
 */
router.get('/all', isAuthenticated, isAdmin, getAllUsers);

/**
 *
 * A GET route to check if the requestor is an admin. Checks first if the
 * requestor is a authenticated. Throws an error if the requestor is not an admin.
 */
router.get('/adminstatus', isAuthenticated, isAdmin, approve);

/**
 * A PUT route to upgrade a user's privilege. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
router.put('/promote', isAuthenticated, isAdmin, upgradePrivilege);

/**
 * A PUT route to upgrade a user's privilege
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
// delete during deployment
router.put('/autopromote', upgradePrivilege);

/**
 * A PUT route to delete a user. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects the following fields in the URL:
 * email (string) - The email of the user to be deleted
 */
router.delete('/:email', isAuthenticated, isAdmin, deleteUser);

/**
 * A GET route to get all questions. Checks first if the requestor is a
 * authenticated and is an admin.
 */
//  router.get('/allQuestions', isAuthenticated, isAdmin, getAllQuestions);
router.get('/allQuestions', isAuthenticated, getAllQuestions);

/**
 * A PUT route to edit certain question. Checks first if the requestor is a
 * authenticated and is an admin.
 * Expects an IQuestion

 */
router.put('/editQuestion', isAuthenticated, editQuestionText);

router.get('/allResources', isAuthenticated, getAllResources);

router.put('/editResource', isAuthenticated, editResource);

router.delete('/resource/:id', isAuthenticated, deleteResource);

router.get('/allDefinitions', isAuthenticated, getAllDefinitions);

router.put('/editDefinition', isAuthenticated, editDefinition);

router.delete('/definition/:id', isAuthenticated, deleteDefinition);

export default router;
