import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteQuestion } from './api'; // change to deleteQuestion
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/ConfirmationModal';

interface DeleteQuestionButtonProps {
  isQuestion: boolean;
  text: string;
  removeRow: (question: string) => void;
}

/**
 * The button component which, when clicked, will delete the question from the database.
 * If the user is not a valid question, button will be unclickable //this is kinda unnecessary lowkey
 * @param isQuestion - whether the question is valid
 * @param text - the text of the question to delete
 * @param removeRow - a function which removes a row from the question table. This
 * function is called upon successfully deletion of user from the database.
 */
function DeleteQuestionButton({
  isQuestion,
  text,
  removeRow,
}: DeleteQuestionButtonProps) {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  async function handleDelete() {
    setLoading(true);
    if (true) {
      // (await deleteQuestion(text)) {//if you comment this out it'll go to the login page but rn this never returns true bc theres no user created that it can delete
      removeRow(text);
      // go to new page just to check button functionality
      navigate('/login');
    } else {
      setLoading(false);
    }
  }
  if (isLoading) {
    return <LoadingButton />;
  }
  if (isQuestion) {
    // valid question
    return (
      <ConfirmationModal
        buttonText="Remove Question"
        title="Are you sure you want to remove this question?"
        body="This action is permanent. Question information will not be able to be recovered."
        onConfirm={() => handleDelete()}
      />
    );
  }
  return (
    <Button variant="outlined" disabled>
      Question is Invalid
    </Button>
  );
}

export default DeleteQuestionButton;
