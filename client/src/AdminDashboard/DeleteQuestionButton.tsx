import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { deleteResource } from './api'; // change to deleteQuestion
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/ConfirmationModal';
import { IQuestion } from '../util/types/question';

interface DeleteQuestionButtonProps {
  id: string;
  question: IQuestion;
  removeRow: (question: IQuestion) => void;
}

/**
 * The button component which, when clicked, will delete the question from the database.
 * If the user is not a valid question, button will be unclickable //this is kinda unnecessary lowkey
 * @param id - id of the question to delete
 * @param question - the question to delete
 * @param removeRow - a function which removes a row from the question table. This
 * function is called upon successfully deletion of user from the database.
 */
function DeleteQuestionButton({
  id,
  question,
  removeRow,
}: DeleteQuestionButtonProps) {
  const [isLoading, setLoading] = useState(false);

  async function handleDeleteResource() {
    setLoading(true);
    await deleteResource(id);
    removeRow(question);
    setLoading(false);
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  if (question.isQuestion) {
    return (
      <Button variant="outlined" disabled>
        Delete Question
      </Button>
    );
  }
  // resource
  return (
    <ConfirmationModal
      buttonText="Remove Resource"
      title="Are you sure you want to remove this resource?"
      body="This action is permanent. Resource information will not be able to be recovered."
      onConfirm={() => handleDeleteResource()}
    />
  );
}

export default DeleteQuestionButton;
