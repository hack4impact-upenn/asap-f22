import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { IQuestion } from '../../util/types/question';
import { IAnswer } from '../../util/types/answer';
import { IDefinition } from '../../util/types/definition';

/**
 * Returns the edit button for the object
 * @param object - the object to edit
 * @returns the edit button for the object
 */

interface EditButtonProps {
  object: IQuestion | IAnswer | IDefinition;
}

function EditButton({ object }: EditButtonProps) {
  let toPath = '';
  if ((object as IQuestion).isQuestion !== undefined) {
    toPath = '/edit-question';
  } else if ((object as IAnswer).resourceContent !== undefined) {
    toPath = '/edit-resource';
  } else if ((object as IDefinition).word !== undefined) {
    toPath = '/edit-definition';
  } else {
    toPath = '/home';
  }

  return (
    <div>
      <Link to={toPath} state={{ object }} style={{ textDecoration: 'none' }}>
        <Button variant="outlined">Edit</Button>
      </Link>
    </div>
  );
}

export default EditButton;
