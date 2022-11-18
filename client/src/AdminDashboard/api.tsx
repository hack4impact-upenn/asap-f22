/**
 * A file containing all the api calls for the admin dashboard.
 */
import { deleteData, putData, postData } from '../util/api';

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

async function deleteQuestion(text: string) {
  const res = await deleteData(`admin/${text}`);
  if (res.error) return false;
  return true;
}

// routes! hopefully
async function editQuestion(
  questionVals: { [key: string]: string },
  answerVals: { [key: string]: string },
) {
  const res = await putData(`admin/editQuestion`, {
    // add in all fields
    questionVals,
    answerVals,
  });
  if (res.error) return false;
  return true;
}

// async function editAnswer(questionID: string, answer: string) {
//   const res = await putData(`admin/${questionID}`, { //put = add, post = create new
//     // call this for every answer
//     answer,
//   }); //does this edit or just add new question?
//   if (res.error) return false;
//   return true;
// }

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

export { deleteUser, deleteQuestion, editQuestion, upgradePrivilege };
