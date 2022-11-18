import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid, ListItemSecondaryAction } from '@mui/material';
import Box from '@mui/system/Box';
import { ViewComfyAltOutlined } from '@mui/icons-material';
import ScreenGrid from '../components/ScreenGrid';
import AnswerButton from './AnswerButton';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';

interface QuestionComponentProps {
  question: IQuestion;
}

function QuestionComponent(props: QuestionComponentProps) {
  const { question } = props;
  // State values and hooks
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Helper functions
  const setQuestions = (value: string) => {
    setAllQuestions((current) => [...current, value]);
  };
  const setAnswers = (value: string) => {
    setAllAnswers((current) => [...current, value]);
  };
  const incrementIndex = () => {
    setQuestionIndex((current) => current + 1);
  };
  const decrementIndex = () => {
    setQuestionIndex((current) => current - 1);
  };

  // temp click handler -- this should appear on page that has the entire question component along with the state
  const clickHandler = (
    // event: any,
    answer: string,
    // resultantQuestionId: string,
  ) => {
    // these should be part of state (as done above)
    console.log(answer);
    if (allAnswers.length === questionIndex) {
      setAnswers(answer);
    } else {
      setAllAnswers(
        allAnswers.map((a, i) => {
          if (i === questionIndex) {
            // Update answer at question index
            return answer;
          }
          return a;
        }),
      );
    }
    incrementIndex();
    // get new question info from backend route (using resultantQuestionId)

    // actual one should make next component (with ref field)
    // console.log(allAnswers);
  };

  return (
    // eslint-disable-next-line no-underscore-dangle
    <div id={question._id}>
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
                    // console.log(e);
                    clickHandler(e.target.id);
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
