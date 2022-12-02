/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
import ResourceComponent from './ResourceComponent';
import ResourceDropdown from '../components/ResourceDropdown';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';
import { IResource } from '../util/types/resource';
import { getData, useData } from '../util/api';

/**
 * This page is the source of truth for all the state driven interactions of the question system.
 * .
 * So basically, it handles updating the currentQuestion which then depending on the type of question
 * will display a resource component or a question component.
 * .
 * It also stores an array of "allQuestions" which will be used to handle to "back" functionality
 */
function QuestionPage() {
  const initialQuestionResponse = getData(
    'question/get-next-question/6369a04ee0cca0b76f26576b',
  );

  const [currentQuestion, setCurrentQuestion] = useState({
    _id: 'Placeholder',
    text: '',
    isQuestion: true,
    resultantAnswers: [],
  } as IQuestion);

  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const initialQuestion = useData(
    `question/get-question/637ea16cf9860ef25c72e639`,
  );

  // Helper functions
  const appendQuestion = (value: string) => {
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

  useEffect(() => {
    if (initialQuestion != null) {
      setCurrentQuestion({
        _id: initialQuestion?.data._id,
        text: initialQuestion?.data.text,
        isQuestion: initialQuestion?.data.isQuestion,
        resultantAnswers: initialQuestion?.data.resultantAnswers,
      } as IQuestion);
      appendQuestion(initialQuestion?.data._id);
      incrementIndex();
    }
  }, [initialQuestion]);

  // This click handler gets passed down to QuestionComponent and AnswerButton
  const ClickHandler = (answerID: string) => {
    // these should be part of state (as done above)
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
        // eslint-disable-next-line no-underscore-dangle
        appendQuestion(res.data._id);
        incrementIndex();
      };
      fetchData();
    })();
  };

  if (currentQuestion.isQuestion) {
    return (
      <ScreenGrid>
        {/* {allQuestions.map((question) => {
          return <Typography>{question}</Typography>;
        })} */}
        <QuestionComponent
          question={currentQuestion}
          handleClick={ClickHandler}
        />
      </ScreenGrid>
    );
  } // gets mad at else here, idk why
  // if (!currentQuestion.isQuestion) {
  return (
    <ScreenGrid>
      <ResourceComponent question={currentQuestion} />
    </ScreenGrid>
  );
  // }
}

export default QuestionPage;
