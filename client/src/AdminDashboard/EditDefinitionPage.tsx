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
import { editDefinition } from './api';
import { IDefinition } from '../util/types/definition';
import EditorGUI from '../components/EditorGUI';
import NavBar from '../components/NavBar';
import ScreenGrid from '../components/ScreenGrid';

export default function EditDefinitionPage() {
  const defaultDefinition: IDefinition = useLocation().state.object;
  const didMountRef = useRef(false);

  const [values, setValueState] = useState(defaultDefinition);
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
      editDefinition(values);
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
            <Typography variant="h5" marginBottom={2}>
              Word:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="word" />
          </Container>
          <Container sx={{ margin: 4, width: '100%', padding: 0 }}>
            <Typography variant="h5" marginBottom={2}>
              Definition:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="definition" />
          </Container>
          <Container sx={{ margin: 4, width: '100%', padding: 0 }}>
            <Typography variant="h5" marginBottom={2}>
              Link:
            </Typography>
            <EditorGUI values={values} setValue={setValue} type="link" />
          </Container>
        </Box>
      </Box>
    </ScreenGrid>
  );
}
