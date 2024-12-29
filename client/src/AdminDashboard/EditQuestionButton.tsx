import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import LoadingButton from '../components/buttons/LoadingButton';
import { IQuestion } from '../util/types/question';

interface EditQuestionButtonProps {
  question: IQuestion;
}

/**
 * The button component which, when clicked, will edit the question from the database.
 * If the user is not a valid question, button will be unclickable //this is kinda unnecessary lowkey
 * @param question - the question to edit
 * data in the database if put data works right lol
 */
function EditQuestionButton({ question }: EditQuestionButtonProps) {
  const navigate = useNavigate();

  if (question.isQuestion) {
    // valid question
    return (
      <div>
        <Link
          to="/edit-question"
          state={{ question }}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="outlined">Edit Question</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/edit-resource"
        state={{ question }}
        style={{ textDecoration: 'none' }}
      >
        <Button variant="outlined">Edit Resource</Button>
      </Link>
    </div>
  );
}

export default EditQuestionButton;
