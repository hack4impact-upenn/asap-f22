/**
 * A file containing all the api calls for the admin dashboard.
 */
import { deleteData, putData } from '../util/api';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';
import { IDefinition } from '../util/types/definition';

/**
 * Sends a request to the server to delete a user
 * @param email - the email of the user to delete
 * @returns true if successful, false otherwise
 */
async function deleteUser(email: string) {
  const res = await deleteData(`admin/${email}`);
  if (res.error) return false;
  return true;
}

async function deleteResource(id: string) {
  const res = await deleteData(`admin/resource/${id}`);
  if (res.error) return false;
  return true;
}

async function editResource(resource: IAnswer) {
  const res = await putData(`admin/editResource`, {
    resource,
  });
  if (res.error) return false;
  return true;
}

async function editQuestion(question: IQuestion) {
  const res = await putData(`admin/editQuestion`, {
    question,
  });
  if (res.error) return false;
  return true;
}

async function deleteDefinition(id: string) {
  const res = await deleteData(`admin/definition/${id}`);
  if (res.error) return false;
  return true;
}

async function editDefinition(definition: IDefinition) {
  const res = await putData(`admin/editDefinition`, {
    definition,
  });
  if (res.error) return false;
  return true;
}

/**
 * Sends a request to the server to promote a user to admin
 * @param email - the email of the user to promote
 * @returns true if successful, false otherwise
 */
async function upgradePrivilege(email: string) {
  const res = await putData('admin/promote', { email });
  if (res.error) return false;
  return true;
}

export {
  deleteUser,
  editQuestion,
  editResource,
  deleteResource,
  editDefinition,
  deleteDefinition,
  upgradePrivilege,
};
