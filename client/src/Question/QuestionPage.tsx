import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import ScreenGrid from '../components/ScreenGrid';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import QuestionComponent from './QuestionComponent';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';

function QuestionPage() {
  const testa = {
    id: 'A123',
    text: 'ANSWER',
    resultantQuestionId: '1234',
  } as IAnswer;
  const testq1 = {
    _id: '1',
    text: 'question 1',
    isQuestion: true,
    resultantAnswers: [testa],
  } as IQuestion;
  const testq2 = {
    _id: '2',
    text: 'question 2',
    isQuestion: true,
    resultantAnswers: [testa],
  } as IQuestion;
  const testq3 = {
    _id: '3',
    text: 'question 3',
    isQuestion: true,
    resultantAnswers: [testa],
  } as IQuestion;

  return (
    <ScreenGrid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        minHeight="100vh"
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>

        <Grid
          sx={{ marginBottom: '0px', paddingBottom: '0px' }}
          height="100%"
          container
          direction="column"
          xs
          alignItems="center"
          justifyContent="space-between"
        >
          <QuestionComponent questions={[testq1, testq2, testq3]} />
        </Grid>
        <Grid item width="100%">
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default QuestionPage;
