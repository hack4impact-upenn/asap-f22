/* eslint-disable prettier/prettier */
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
    text: 'answer',
    resultantQuestionId: '1234',
  } as IAnswer;

  const [currentQuestion, setCurrentQuestion] = useState({
    id: '123',
    text: 'This is the root question',
    isQuestion: true,
    resultantAnswers: [testa],
  } as IQuestion);

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
  const ClickHandler = (
    // event: any,
    answerID: string,
    // resultantQuestionId: string,
  ) => {
    // these should be part of state (as done above)
    console.log(answerID);
    if (allAnswers.length === questionIndex) {
      setAnswers(answerID);
    } else {
      setAllAnswers(
        allAnswers.map((a, i) => {
          if (i === questionIndex) {
            // Update answer at question index
            return answerID;
          }
          return a;
        }),
      );
    }
    incrementIndex();

    setCurrentQuestion({
        id: '123',
        text: 'This is the new question',
        isQuestion: true,
        resultantAnswers: [testa],
      } as IQuestion) 
  
    
    // const nextQuestion = useData(`question//get-next-question/:${answerID}`);
  };

  return (
    <ScreenGrid>
      <QuestionComponent
        question={currentQuestion}
        handleClick={ClickHandler}
      />
    </ScreenGrid>
  );
}

export default QuestionPage;
