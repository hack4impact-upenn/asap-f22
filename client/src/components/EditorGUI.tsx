import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import ConfirmationModal from './ConfirmationModal';
import { IAnswer } from '../util/types/answer';

export default function EditorGUI({
  values,
  setValue,
  type,
  idx,
  deleted,
}: any) {
  const editor = useRef(null);
  // console.log(values);
  let defaultText = '';
  if (type === 'question') {
    defaultText = values.text;
  } else if (type === 'title') {
    defaultText = values.resultantAnswers[idx].text;
  } else {
    defaultText = values.resultantAnswers[idx].resourceContent;
  }
  // change useState input if we store everything as html in db
  const [text, setText] = useState(defaultText);
  const [clicked, setClicked] = useState(false);

  const updateTitle = (index: any) => {
    const newArray = values.resultantAnswers.map((item: IAnswer, i: any) => {
      if (index === i) {
        const newAnswer: IAnswer = {
          // eslint-disable-next-line no-underscore-dangle
          _id: item._id,
          // eslint-disable-next-line object-shorthand
          text: text,
          resultantQuestionId: item.resultantQuestionId,
          resourceContent: item.resourceContent,
          resourceLink: item.resourceLink,
        };
        return newAnswer;
      }
      return item;
    });
    setValue('resultantAnswers', newArray);
  };

  const updateDescription = (index: any) => {
    const newArray = values.resultantAnswers.map((item: IAnswer, i: any) => {
      if (index === i) {
        const newAnswer: IAnswer = {
          // eslint-disable-next-line no-underscore-dangle
          _id: item._id,
          text: item.text,
          resultantQuestionId: item.resultantQuestionId,
          resourceContent: text,
          resourceLink: text,
        };
        return newAnswer;
      }
      return item;
    });
    setValue('resultantAnswers', newArray);
  };

  const handleUpdate = () => {
    if (type === 'question') {
      // const newText = text.replaceAll(/<[^>]*>?/gm, '');
      setValue('text', text);
    } else if (type === 'title') {
      updateTitle(idx);
    } else if (type === 'description') {
      updateDescription(idx);
    }
    setClicked(false);
  };

  const handleCancelClick = () => {
    setClicked(!clicked);
    setText(defaultText);
    console.log(text);
  };

  return (
    <Card
      className="App"
      sx={{ boxShadow: 2 }}
      style={deleted ? { color: '#C0C0C0' } : {}}
    >
      <CardContent>
        <Typography variant="h6" dangerouslySetInnerHTML={{ __html: text }} />
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
