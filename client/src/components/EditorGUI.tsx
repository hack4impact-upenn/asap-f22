import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import ConfirmationModal from './ConfirmationModal';

export default function EditorGUI({ values, setValue, type, idx }: any) {
  const editor = useRef(null);
  console.log(values);
  let defaultText = '';
  if (type === 'question') {
    defaultText = values.question;
  } else if (type === 'title') {
    defaultText = values.answer.text;
  } else {
    defaultText = values.answer.resourceContent;
  }
  // change useState input if we store everything as html in db
  defaultText = `<p>${defaultText}</p>`;
  const [text, setText] = useState(defaultText);
  const [clicked, setClicked] = useState(false);

  const updateTitle = ({ index }: any) => {
    const newArray = values.answer.map(({ item, i }: any) => {
      if (index === i) {
        return { ...item, text };
      }
      return item;
    });
    setValue('answer', newArray);
  };

  const updateDescription = ({ index }: any) => {
    const newArray = values.answer.map(({ item, i }: any) => {
      if (index === i) {
        return { ...item, resourceContent: text };
      }
      return item;
    });
    setValue('answer', newArray);
  };

  const handleUpdate = () => {
    if (type === 'question') {
      setValue(`${type}`, text);
    } else if (type === 'title') {
      updateTitle(idx);
    } else if (type === 'description') {
      updateDescription(idx);
    }
    console.log(values);
    setClicked(false);
  };

  const handleCancelClick = () => {
    setClicked(!clicked);
    setText(defaultText);
  };

  return (
    <Card className="App" sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" dangerouslySetInnerHTML={{ __html: text }} />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{ margin: 1 }}
          onClick={() => handleCancelClick()}
        >
          Edit
        </Button>
      </CardActions>

      {clicked && (
        <CardContent>
          <JoditEditor ref={editor} value={text} onChange={setText} />
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            onClick={() => handleUpdate()}
          >
            Confirm
          </Button>
          {/* <ConfirmationModal
            buttonText="Confirm"
            title="Are you sure you want to edit this resource?"
            body="This action is permanent. Resource information will not be able to be recovered."
            // onConfirm={() => {}}
          /> */}
          <Button variant="outlined" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
