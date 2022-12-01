import React, { useEffect, useState } from 'react';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
import ResourceComponent from './ResourceComponent';
import ResourceDropdown from '../components/ResourceDropdown';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';
import { IResource } from '../util/types/resource';
import { getData, useData } from '../util/api';

function QuestionPage() {
  // const testa = {
  //   id: '637ea185f9860ef25c72e63a',
  //   text: 'Q1 Answer 1',
  //   resultantQuestionId: '63751d7cc26b48cf7f1d9724',
  // } as IAnswer;

  // const testResourceAns = {
  //   id: '63813ff774b0e803fd9614db',
  //   text: 'Resource 1',
  //   resultantQuestionId: '63813ff774b0e803fd9614db',
  // } as IAnswer;

  const initialQuestionResponse = getData(
    'question/get-next-question/6369a04ee0cca0b76f26576b',
  );

  // const [currentQuestion, setCurrentQuestion] = useState({
  //   _id: '637ea16cf9860ef25c72e639',
  //   text: 'This is the first question',
  //   isQuestion: true,
  //   resultantAnswers: [testa],
  // } as IQuestion);

  const [currentQuestion, setCurrentQuestion] = useState({
    _id: 'Placeholder',
    text: '',
    isQuestion: true,
    resultantAnswers: [],
  } as IQuestion);

  // const [resource, setResource] = useState({
  //   _id: '',
  //   title: '',
  //   content: '',
  // } as IResource);

  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const initialQuestion = useData(
    `question/get-question/637ea16cf9860ef25c72e639`,
  );

  useEffect(() => {
    if (initialQuestion != null) {
      setCurrentQuestion({
        // eslint-disable-next-line no-underscore-dangle
        _id: initialQuestion?.data._id,
        text: initialQuestion?.data.text,
        isQuestion: initialQuestion?.data.isQuestion,
        resultantAnswers: initialQuestion?.data.resultantAnswers,
      } as IQuestion);
    }
  }, [initialQuestion]);

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
      };
      fetchData();
    })();

    // if (!currentQuestion.isQuestion) {
    // const nextResource = getData(`resource/get-resource/${answerID}`);
    // }

    // (async () => {
    //   const fetchData = async () => {
    //     const res = await nextResource;
    //     console.log(res);
    //     // setCurrentQuestion(res.data);
    //     setResource({
    //       // eslint-disable-next-line no-underscore-dangle
    //       _id: res.data._id,
    //       title: res.data.title,
    //       content: res.data.content,
    //     } as IResource);
    //   };
    //   fetchData();
    // })();
  };

  if (currentQuestion.isQuestion) {
    return (
      <ScreenGrid>
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
