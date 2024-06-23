/**
 * A file containing all the api calls for the admin dashboard.
 */
import { deleteData, putData } from '../util/api';
import { IQuestion } from '../util/types/question';

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

// routes! hopefully
async function editQuestion(question: IQuestion) {
  const res = await putData(`admin/editQuestion`, {
    question,
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

export { deleteUser, editQuestion, deleteResource, upgradePrivilege };
