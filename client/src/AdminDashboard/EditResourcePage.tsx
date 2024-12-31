/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Alert,
  AlertTitle,
  AppBar,
} from '@mui/material';
import { editResource } from './api';
import { IAnswer } from '../util/types/answer';
import EditorGUI from '../components/EditorGUI';
import NavBar from '../components/NavBar';
import ScreenGrid from '../components/ScreenGrid';

export default function EditResourcePage() {
  const defaultResource: IAnswer = useLocation().state.object;
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
      editResource(values);
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
          px: 0,
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <Box margin="auto" width="70vw">
          <Container sx={{ margin: 4 }}>
            <Alert severity="warning" sx={{ marginBottom: 4 }}>
              <AlertTitle>
                Please make sure that any link you add starts with
                <strong>&quot;http://&quot;</strong> or{' '}
                <strong>&quot;https://&quot;</strong>!
              </AlertTitle>
            </Alert>
          </Container>
          <Container sx={{ margin: 4, width: '100%' }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Resource Name:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="text" />
          </Container>
          <Container sx={{ margin: 4, width: '100%' }}>
            <Typography variant="h5" marginBottom={2}>
              Resource Content:
            </Typography>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="resourceContent"
            />
          </Container>
          <Container sx={{ margin: 4, width: '100%' }}>
            <Typography variant="h5" marginBottom={2}>
              Resource Link:
            </Typography>
            <EditorGUI
              values={values}
              setValue={setValue}
              type="resourceLink"
            />
          </Container>
        </Box>
      </Box>
    </ScreenGrid>
  );
}
