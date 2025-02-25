/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
import ResourceComponent from './ResourceComponent';
import { IQuestion } from '../util/types/question';
import { getData } from '../util/api';
import SidebarComponent from '../components/sidebar/SidebarComponent';
import BackButton from './Components/BackButton';
import NextButton from './Components/NextButton';
import StartOverButton from './Components/StartOverButton';

/**
 * This page is the source of truth for all the state driven interactions of the question system.
 * .
 * So basically, it handles updating the currentQuestion which then depending on the type of question
 * will display a resource component or a question component.
 * .
 * It also stores an array of "allQuestions" which will be used to handle to "back" functionality
 */
function QuestionPage() {
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null,
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState<string[]>([]);

  // Helper functions
  const appendQuestion = (value: string) => {
    setAllQuestions((curr) => [...curr, value]);
  };
  const incrementIndex = () => {
    setQuestionIndex((curr) => curr + 1);
  };
  const decrementIndex = () => {
    setQuestionIndex((curr) => curr - 1);
  };

  const getNextFromID = (questionID: string) => {
    const nextQuestion = getData(`question/get-question/${questionID}`);
    (async () => {
      const fetchData = async () => {
        const res = await nextQuestion;
        // setCurrentQuestion(res.data);
        setCurrentQuestion({
          // eslint-disable-next-line no-underscore-dangle
          _id: res.data._id,
          text: res.data.text,
          isQuestion: res.data.isQuestion,
          resultantAnswers: res.data.resultantAnswers,
        } as IQuestion);
      };
      fetchData();
    })();
  };

  // This click handler gets passed down to QuestionComponent and AnswerButton
  const getNextFromAnswer = (answerID: string) => {
    // these should be part of state (as done above)

    // if our curr index != length of questions array
    // truncate both the answers array and the questions array at that index
    // and then do the following code
    if (questionIndex !== allQuestions.length - 1) {
      allQuestions.length = questionIndex + 1;
    }

    const nextQuestion = getData(`question/get-next-question/${answerID}`);

    (async () => {
      const fetchData = async () => {
        const res = await nextQuestion;
        // setCurrentQuestion(res.data);
        appendQuestion(res.data._id);
        setCurrentQuestion({
          // eslint-disable-next-line no-underscore-dangle
          _id: res.data._id,
          text: res.data.text,
          isQuestion: res.data.isQuestion,
          resultantAnswers: res.data.resultantAnswers,
        } as IQuestion);
        incrementIndex();
      };
      fetchData();
    })();
  };

  const handleBack = () => {
    const newQID = allQuestions.at(questionIndex - 1);
    if (newQID) {
      getNextFromID(newQID);
      decrementIndex();
    }
  };

  const handleNext = () => {
    const newQID = allQuestions[questionIndex + 1];
    getNextFromID(newQID);
    incrementIndex();
  };

  useEffect(() => {
    if (allQuestions.length === 0) {
      // FLAG: HARDCODED
      getNextFromID('000000010000000000000000');
      appendQuestion('000000010000000000000000');
    }
  }, [allQuestions, currentQuestion, questionIndex]);

  if (!currentQuestion) {
    return (
      <ScreenGrid>
        <CircularProgress />
      </ScreenGrid>
    );
  }

  let leftButton = <div />;
  if (questionIndex !== 0) {
    leftButton = <BackButton onClick={handleBack} />;
  } else {
    leftButton = <div />;
  }

  let rightButton = <div />;
  if (currentQuestion.isQuestion) {
    if (questionIndex === allQuestions.length - 1) {
      rightButton = <div />;
    } else {
      rightButton = <NextButton onClick={handleNext} />;
    }
  } else {
    rightButton = <StartOverButton />;
  }

  if (currentQuestion.isQuestion) {
    return (
      <ScreenGrid>
        <SidebarComponent currentQuestion={currentQuestion}>
          <Box
            sx={{
              width: { xs: '90%', sm: '65%' },
              marginX: 'auto',
              marginBottom: '50px',
            }}
          >
            <QuestionComponent
              question={currentQuestion}
              handleClick={getNextFromAnswer}
            />
          </Box>
        </SidebarComponent>
        {leftButton}
        {rightButton}
      </ScreenGrid>
    );
  }
  return (
    <ScreenGrid>
      <SidebarComponent currentQuestion={currentQuestion}>
        <Box
          sx={{
            width: { xs: '90%', sm: '65%' },
            marginX: 'auto',
            marginBottom: '50px',
          }}
        >
          <ResourceComponent question={currentQuestion} />
        </Box>
      </SidebarComponent>
      {leftButton}
      {rightButton}
    </ScreenGrid>
  );
}

export default QuestionPage;
