import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { editQuestion } from './api';
import LoadingButton from '../components/buttons/LoadingButton';
import ConfirmationModal from '../components/ConfirmationModal';
import { IQuestion } from '../util/types/question';
import EditResource from '../components/EditResource';
import EditQuestion from '../components/EditQuestion';
import { IAnswer } from '../util/types/answer';

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

  const tempAnswer1: IAnswer = {
    _id: '6369a05ce0cca0b76f26576c',
    text: '2x edited answer text 1',
    resultantQuestionId: '63751d7cc26b48cf7f1d9724',
    resourceContent: '',
    resourceLink: '',
  };
  const tempAnswer2: IAnswer = {
    _id: '6369a04ee0cca0b76f26576b',
    text: '2x edited answer text 2',
    resultantQuestionId: '63751d7cc26b48cf7f1d9724',
    resourceContent: '',
    resourceLink: '',
  };
  const tempQuestion: IQuestion = {
    _id: '63699fdbe0cca0b76f26576a',
    text: '2x edited question text',
    isQuestion: true,
    resultantAnswers: [tempAnswer1, tempAnswer2],
  };

  const [isLoading, setLoading] = useState(false);
  async function handleEdit() {
    setLoading(true);
    // tempQuestion should be replaced with question prop. Question needs to have all correct edited values. Shouldn't this happen in EditorGUI?
    if (await editQuestion(tempQuestion)) {
      // navigate('/newquestion'); // go to create new question page
      // const newtext = newquestionpage.getData(); //this isnt real, but //click save in newquestion page; should return new text data
      // editRow(text, newtext); //basically just deletes the row for now
      // overwrite current row text
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
      <div>
        <Link
          to="/editQuestion"
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
        to="/editResource"
        state={{ question }}
        style={{ textDecoration: 'none' }}
      >
        <Button variant="outlined">Edit Resource</Button>
      </Link>
    </div>
  );
}

export default EditQuestionButton;
