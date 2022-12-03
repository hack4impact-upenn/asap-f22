import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { editQuestion } from './api';
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/ConfirmationModal';
import { IQuestion } from '../util/types/question';
import EditResource from '../components/EditResource';

interface EditQuestionButtonProps {
  qID: string;
  isQuestion: boolean;
  text: string;
  question: IQuestion;
  editRow: (qID: string, question: string, newText: string) => void;
}

/**
 * The button component which, when clicked, will edit the question from the database.
 * If the user is not a valid question, button will be unclickable //this is kinda unnecessary lowkey
 * @param isQuestion - whether the question is valid
 * @param text - the text of the question to edit
 * @param editRow - a function which edits a row from the question table. should be called after editing the user
 * data in the database if put data works right lol
 */
function EditQuestionButton({
  qID,
  isQuestion,
  text,
  question,
  editRow,
}: EditQuestionButtonProps) {
  const navigate = useNavigate();

  const questionVals = {
    [qID]: 'updated question text',
  };
  const answerVals: { [index: string]: string } = {
    // '6369a04ee0cca0b76f26576b': 'lalalala',
    // '6369a05ce0cca0b76f26576c': 'hehehehehe',
  };

  const [isLoading, setLoading] = useState(false);
  async function handleEdit() {
    setLoading(true);
    // edit question needs to take in new text that user has typed in
    if (await editQuestion(questionVals, answerVals)) {
      // navigate('/newquestion'); // go to create new question page
      // const newtext = newquestionpage.getData(); //this isnt real, but //click save in newquestion page; should return new text data
      // editRow(text, newtext); //basically just deletes the row for now
      // overwrite current row text
      console.log('hi');
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
        buttonText="Edit Question"
        title="Are you sure you want to edit this question?"
        body="This action is permanent. Question information will not be able to be recovered."
        onConfirm={() => handleEdit()}
      />
    );
  }

  return (
    <div>
      <Link to="/editResource" state={{ question }}>
        <button type="button">Edit Resource</button>
      </Link>
      <Button variant="outlined" disabled>
        Question is Invalid
      </Button>
    </div>
  );
}

export default EditQuestionButton;
