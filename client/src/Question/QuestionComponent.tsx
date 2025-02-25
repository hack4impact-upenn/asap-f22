import React from 'react';
import { Typography, Grid } from '@mui/material';
import HTMLMapper from '../components/HTMLMapper';
import AnswerButton from './Components/AnswerButton';
import { IQuestion } from '../util/types/question';

interface QuestionComponentProps {
  question: IQuestion;
  handleClick: (answerID: string) => any;
}

function QuestionComponent(props: QuestionComponentProps) {
  const { handleClick, question } = props;

  return (
    // eslint-disable-next-line no-underscore-dangle
    <div>
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
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign="center"
              sx={{
                fontSize: {
                  xs: '1.75rem', // Smaller font size for mobile
                  sm: '2.5rem', // Medium size for tablets
                  md: '3rem', // Larger size for desktops (h2 default)
                },
              }}
            >
              <HTMLMapper text={question.text} />
            </Typography>
          </Grid>
          {question.resultantAnswers.map((answer) => {
            return (
              <Grid
                container
                direction="column"
                alignItems="center"
                padding={1}
              >
                <AnswerButton
                  answer={answer}
                  onClick={() => {
                    // eslint-disable-next-line no-underscore-dangle
                    handleClick(answer._id);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default QuestionComponent;
