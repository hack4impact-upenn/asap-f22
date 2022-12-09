import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box } from '@mui/material';
import { sizing } from '@mui/system';
import EditorGUI from './EditorGUI';

export default function EditResource() {
  const resource = useLocation().state.question;

  const defaultValues = {
    question: resource.text,
    answer: resource.resultantAnswers,
  };

  const [values, setValueState] = useState(defaultValues);
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };

  return (
    <Box mt={8} mx={10} width={3 / 5}>
      <Container>
        <Typography variant="h5">Resource:</Typography>
        <EditorGUI values={values} setValue={setValue} type="question" />
      </Container>
      <br />
      {values.answer.map(({ ans, idx }: any) => {
        return (
          <Container>
            <Typography variant="h5">Title:</Typography>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="title"
              idx={idx}
            />{' '}
            <br />
            <Typography variant="h5">Content:</Typography>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="description"
              idx={idx}
            />{' '}
          </Container>
        );
      })}
    </Box>
  );
}
