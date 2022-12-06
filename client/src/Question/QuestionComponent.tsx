import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid, ListItemSecondaryAction } from '@mui/material';
import Box from '@mui/system/Box';
import { ViewComfyAltOutlined } from '@mui/icons-material';
import ScreenGrid from '../components/ScreenGrid';
import AnswerButton from './AnswerButton';
import BackButton from './BackButton';
import NextButton from './NextButton';
import { IAnswer } from '../util/types/answer';
import { IQuestion } from '../util/types/question';

interface QuestionComponentProps {
  questions: IQuestion[];
}

// eslint-disable-next-line prefer-const
let hasGoneBack = false;
let hasGoneForward = false;

// moved up

const incrementIndex2 = (
  func: React.Dispatch<React.SetStateAction<number>>,
) => {
  // console.log('hi');
  func((current) => current + 1);
  hasGoneForward = true;
};
const decrementIndex2 = (
  func: React.Dispatch<React.SetStateAction<number>>,
) => {
  // console.log('bye');
  func((current) => current - 1);
};

function ShowButton(
  questions: IQuestion[],
  qIndex: () => number,
  func: React.Dispatch<React.SetStateAction<number>>,
) {
  const qs = questions;
  if (qIndex() >= qs.length - 1) {
    hasGoneBack = false;
  }
  if (hasGoneBack) {
    return (
      <NextButton
        onClick={(e: any) => {
          // incrementIndex();
          incrementIndex2(func);
        }}
      />
    );
  }
  return <Typography />;
}

function ShowBack(
  qIndex: () => number,
  func: React.Dispatch<React.SetStateAction<number>>,
) {
  if (qIndex() <= 0) {
    hasGoneForward = false;
  }
  if (hasGoneForward) {
    return (
      <BackButton
        onClick={(e: any) => {
          // decrementIndex();
          decrementIndex2(func);
          hasGoneBack = true;
        }}
      />
    );
  }
  return <Typography />;
}

function QuestionComponent(props: QuestionComponentProps) {
  const { questions } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [questionIndex, setQuestionIndex] = useState(0);

  const question = questions[questionIndex];

  const setQuestions = (value: string) => {
    setAllQuestions((current) => [...current, value]);
  };
  const setAnswers = (value: string) => {
    setAllAnswers((current) => [...current, value]);
  };
  const incrementIndex = () => {
    console.log('hi');
    setQuestionIndex((current) => current + 1);
    hasGoneForward = true;
  };
  const decrementIndex = () => {
    console.log('bye');
    setQuestionIndex((current) => current - 1);
  };

  const getIndex = () => {
    return questionIndex;
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

    // console.log("questions length - 1: ", questions.length - 1);
    // console.log("questionIndex: ", questionIndex);

    // if(questionIndex < (questions.length - 1)) {
    //   incrementIndex();
    // }

    // automatically goes to resources once hit end of questions
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
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '64px',
                  lineHeight: '78px',
                }}
                fontWeight="400"
                textAlign="center"
                text-size="64px"
              >
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
          <Grid>{ShowBack(getIndex, setQuestionIndex)}</Grid>
          {/* <Grid>{ShowButton(props)}</Grid> */}
          <Grid>{ShowButton(questions, getIndex, setQuestionIndex)}</Grid>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default QuestionComponent;
