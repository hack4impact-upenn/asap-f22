import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container, Box, AppBar, Grid } from '@mui/material';
import { editQuestion } from './api';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from '../components/EditorGUI';
import NavBar from '../components/NavBar';
import ScreenGrid from '../components/ScreenGrid';

export default function EditQuestionPage() {
  const defaultResource: IQuestion = useLocation().state.object;
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
    <ScreenGrid>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
        }}
      >
        <NavBar />
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: '64px',
          pb: '64px',
          px: 0,
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <Box margin="auto" width="70vw">
          <Container sx={{ margin: 4, width: '100%' }}>
            <Typography variant="h5" marginBottom={2}>
              Question:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="text" />
          </Container>
          <Container sx={{ margin: 4, width: '100%', padding: 0 }}>
            {!values.resultantAnswers || values.resultantAnswers.length > 0 ? (
              <Typography variant="h5" marginBottom={1}>
                Answers:
              </Typography>
            ) : null}
            {values.resultantAnswers.map((ans: IAnswer, idx: number) => {
              return (
                <Container
                  sx={{ marginY: 2, width: '100%' }}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  // eslint-disable-next-line no-underscore-dangle
                  key={ans._id}
                >
                  <EditorGUI
                    values={values}
                    setValue={setValue}
                    type="title"
                    idx={idx}
                  />
                </Container>
              );
            })}
          </Container>
        </Box>
      </Box>
    </ScreenGrid>
  );
}
