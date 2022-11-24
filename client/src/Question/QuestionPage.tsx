import React, { useEffect, useState } from 'react';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';
import { getData, useData } from '../util/api';

function QuestionPage() {
  const testa = {
    id: '637ea185f9860ef25c72e63a',
    text: 'Q1 Answer 1',
    resultantQuestionId: '63751d7cc26b48cf7f1d9724',
  } as IAnswer;

  const initialQuestionResponse = getData(
    'question/get-next-question/6369a04ee0cca0b76f26576b',
  );

  const [currentQuestion, setCurrentQuestion] = useState({
    _id: '637ea16cf9860ef25c72e639',
    text: 'This is the first question',
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

    const nextQuestion = getData(`question/get-next-question/${answerID}`);
    console.log(nextQuestion);

    (async () => {
      const fetchData = async () => {
        const res = await nextQuestion;
        console.log(res);
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
