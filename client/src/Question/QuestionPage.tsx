/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
import ResourceComponent from './ResourceComponent';
import { IQuestion } from '../util/types/question';
import { getData } from '../util/api';
import SidebarComponent from '../components/sidebar/SidebarComponent';
import Footer from '../components/Footer';
import BackButton from './Components/BackButton';
import NextButton from './Components/NextButton';
import StartOverButton from './Components/StartOverButton';
import PopupWarning from '../components/PopupWarning';

/**
 * This page is the source of truth for all the state driven interactions of the question system.
 * .
 * So basically, it handles updating the currentQuestion which then depending on the type of question
 * will display a resource component or a question component.
 * .
 * It also stores an array of "allQuestions" which will be used to handle to "back" functionality
 */
function QuestionPage() {
  const initialQuestion = '637ea16cf9860ef25c72e639';
  const [currentQuestion, setCurrentQuestion] = useState({
    _id: 'Placeholder',
    text: '',
    isQuestion: true,
    resultantAnswers: [],
  } as IQuestion);

  // const allQuestions: string[] = [initialQuestion];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState<string[]>([initialQuestion]);
  // const [allAnswers, setAllAnswers] = useState<string[]>([]);

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
      console.log('truncate');
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
        console.log(questionIndex);
        console.log(allQuestions);
      };
      fetchData();
    })();
  };

  const handleBack = () => {
    const newQID = allQuestions.at(questionIndex - 1);
    console.log(allQuestions);
    if (newQID) {
      getNextFromID(newQID);
      decrementIndex();
      console.log(questionIndex);
      console.log(allQuestions);
    } else {
      console.log('index or q array wrong');
    }
  };

  const handleNext = () => {
    const newQID = allQuestions[questionIndex + 1];
    getNextFromID(newQID);
    decrementIndex();
    console.log(questionIndex);
    console.log(allQuestions);
  };

  useEffect(() => {
    if (initialQuestion != null) {
      getNextFromID(initialQuestion);
    }
  }, [initialQuestion]);

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
        <SidebarComponent>
          <Grid container direction="row">
            <Grid item width="100%">
              <QuestionComponent
                question={currentQuestion}
                handleClick={getNextFromAnswer}
              />
            </Grid>
            <Grid item width="100%">
              <Footer />
            </Grid>
          </Grid>
          {/* <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography> */}
        </SidebarComponent>
        {leftButton}
        {rightButton}
      </ScreenGrid>
    );
  }
  return (
    <ScreenGrid>
      <ResourceComponent question={currentQuestion} />
      {leftButton}
      {rightButton}
    </ScreenGrid>
  );
  // }
}

export default QuestionPage;
