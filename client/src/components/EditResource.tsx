import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import { sizing } from '@mui/system';
import {
  deleteQuestion,
  deleteResource,
  editQuestion,
} from '../AdminDashboard/api';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import EditorGUI from './EditorGUI';

export default function EditResource() {
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
      // console.log(values);
      editQuestion(values);
    }
  }, [values]);

  const handleDelete = (ans: IAnswer) => {
    deleteResource(values, ans);
    // const ansIdx = values.resultantAnswers.indexOf(ans);
    // if (ansIdx >= 0) {
    //   const newValues = values.resultantAnswers.splice(ansIdx, 1);
    //   setValue('resultantAnswers', newValues);
    // }
    // console.log(values);
  };

  return (
    <Box mt={2} mx={10} width={3 / 5}>
      <Container sx={{ margin: 4 }}>
        <Alert severity="warning" sx={{ marginBottom: 4 }}>
          <AlertTitle>
            ***Please make sure that any link you add starts with
            <strong>&quot;http://&quot;</strong> or{' '}
            <strong>&quot;https://&quot;</strong>!
          </AlertTitle>
        </Alert>
        <Typography variant="h5">Resource Name:</Typography>
        <EditorGUI values={values} setValue={setValue} type="question" />
      </Container>
      <br />
      {values.resultantAnswers.map((ans: IAnswer, idx: any) => {
        return (
          <Container sx={{ margin: 4 }}>
            <div style={{ display: 'flex' }}>
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                Resource #{idx + 1}:
              </Typography>
              <Button variant="outlined" onClick={() => handleDelete(ans)}>
                Delete
              </Button>
            </div>
            <Typography variant="h6">Title:</Typography>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="title"
              idx={idx}
            />{' '}
            <br />
            <Typography variant="h6">Content:</Typography>
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
