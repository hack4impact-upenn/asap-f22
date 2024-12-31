import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';

export default function EditorGUI({
  values,
  setValue,
  type,
  deleted,
  idx,
}: any) {
  const editor = useRef(null);
  // console.log(values);
  let defaultText = '';
  if (type === 'text') {
    defaultText = values.text;
  } else if (type === 'resourceContent') {
    defaultText = values.resourceContent;
  } else if (type === 'definition') {
    defaultText = values.definition;
  } else if (type === 'word') {
    defaultText = values.word;
  } else if (type === 'title') {
    defaultText = values.resultantAnswers[idx].text;
  } else if (type === 'link') {
    if (values.link === undefined) {
      defaultText = '';
    } else {
      defaultText = values.link;
    }
  } else if (type === 'resourceLink') {
    if (values.resourceLink === undefined) {
      defaultText = '';
    } else {
      defaultText = values.resourceLink;
    }
  }
  // change useState input if we store everything as html in db
  const [text, setText] = useState(defaultText);
  const [clicked, setClicked] = useState(false);

  const handleUpdate = () => {
    if (type === 'link' || type === 'resourceLink') {
      // strip link of html tags
      const temp = document.createElement('div');
      temp.innerHTML = text;
      const newText = temp.textContent || temp.innerText || '';
      setText(newText);
      setValue(type, newText);
    } else {
      setValue(type, text);
    }
    setClicked(false);
  };

  const handleCancelClick = () => {
    setClicked(!clicked);
    setText(defaultText);
  };

  return (
    <Card sx={{ boxShadow: 2 }} style={deleted ? { color: '#C0C0C0' } : {}}>
      <CardContent>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{ margin: 1 }}
          onClick={() => handleCancelClick()}
          disabled={clicked || deleted}
        >
          Edit
        </Button>
        {type === 'link' || type === 'resourceLink' ? (
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => window.open(text, '_blank')}
            disabled={deleted}
          >
            Open Link
          </Button>
        ) : null}
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
          <Button variant="outlined" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
