import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid, ListItemSecondaryAction } from '@mui/material';
import Box from '@mui/system/Box';
import { ViewComfyAltOutlined } from '@mui/icons-material';
import ScreenGrid from '../components/ScreenGrid';
import AnswerButton from './AnswerButton';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';
import { useData } from '../util/api';

interface QuestionComponentProps {
  question: IQuestion;
  handleClick: (answerID: string) => any;
}

function QuestionComponent(props: QuestionComponentProps) {
  const { handleClick, question } = props;

  return (
    <div id={question.id}>
      <ScreenGrid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          fit-content="100%"
        >
          <Grid
            container
            height="100%"
            direction="column"
            alignItems="center"
            justifyContent="space-in"
            gap="2%"
          >
            <Grid container direction="column" alignItems="center" padding={2}>
              <Typography variant="h1" fontWeight="bold" textAlign="center">
                {question.text}
              </Typography>
            </Grid>
            {question.resultantAnswers.map((item) => {
              return (
                <AnswerButton
                  answer={item}
                  onClick={(e: any) => {
                    console.log(e);
                    handleClick(e.target.id);
                  }}
                />
              );
            })}
          </Grid>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default QuestionComponent;
