/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import { sizing } from '@mui/system';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from '../components/EditorGUI';
import { deleteResource } from './api';

export default function EditResourceTitleContent({
  values,
  setValue,
  ans,
  idx,
}: any) {
  const [deleted, setDeleted] = useState<boolean>(false);

  const handleDelete = () => {
    deleteResource(values);
    setDeleted(true);
  };

  return (
    <Container sx={{ margin: 4 }} style={deleted ? { color: '#C0C0C0' } : {}}>
      <div style={{ display: 'flex' }}>
        <Typography variant="h5" sx={{ marginRight: 2 }}>
          Resource #{idx + 1}:
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handleDelete()}
          disabled={deleted}
        >
          Delete
        </Button>
      </div>
      <Typography variant="h6">Title:</Typography>
      <EditorGUI
        values={values}
        setValue={setValue}
        type="title"
        idx={idx}
        deleted={deleted}
      />{' '}
      <br />
      <Typography variant="h6">Content:</Typography>
      <EditorGUI
        values={values}
        setValue={setValue}
        type="description"
        idx={idx}
        deleted={deleted}
      />{' '}
    </Container>
  );
}
