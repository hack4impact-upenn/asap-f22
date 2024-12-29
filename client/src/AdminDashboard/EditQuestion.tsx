import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box, Grid } from '@mui/material';
import { editQuestion } from './api';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from '../components/EditorGUI';
import NavBar from '../components/NavBar';
import ScreenGrid from '../components/ScreenGrid';

export default function EditQuestion() {
  const defaultResource: IQuestion = useLocation().state.question;
  const didMountRef = useRef(false);

  const [values, setValueState] = useState(defaultResource);
  const setValue = (field: string, value: any) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      editQuestion(values);
    }
  }, [values]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      height="100vh"
      fit-content="100%"
    >
      <Grid item width="100%">
        <NavBar />
      </Grid>
      <Grid item marginX="auto" marginTop={0}>
        <Box margin="auto" width="70vw">
          <Container sx={{ margin: 4, width: '100%' }}>
            <Typography variant="h5" marginBottom={2}>
              Question:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="question" />
          </Container>
          <Container sx={{ margin: 4 }}>
            {values.resultantAnswers.length > 0 ? (
              <Typography variant="h5" marginBottom={2}>
                Answers:
              </Typography>
            ) : null}
            {values.resultantAnswers.map((ans: IAnswer, idx: any) => {
              return (
                <Container
                  // eslint-disable-next-line no-underscore-dangle
                  key={ans._id}
                  sx={{ marginBottom: 4, width: '100%', padding: 0 }}
                >
                  <EditorGUI
                    values={values}
                    setValue={setValue}
                    type="title"
                    idx={idx}
                  />{' '}
                </Container>
              );
            })}
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
}
