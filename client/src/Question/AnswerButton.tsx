import * as React from 'react';
import { Button } from '@mui/material';
import { IAnswer } from '../util/types/answer';

interface AnswerButtonProps {
  answer: IAnswer;
  onClick: any;
}

function AnswerButton(props: AnswerButtonProps) {
  const { answer, onClick } = props;

  const [isHover, setIsHover] = React.useState(false);
  // const [questionIndex, setQuestionIndex] = React.useState(0);
  // const [allAnswers, setAllAnswers] = React.useState<string[]>([]);

  // // temp click handler -- this should appear on page that has the entire question component along with the state
  // const clickHandler = (
  //   // event: any,
  //   answerId: string,
  //   // resultantQuestionId: string,
  // ) => {
  //   // these should be part of state (as done above)
  //   if (allAnswers.length === questionIndex) {
  //     setAllAnswers((current) => [...current, answerId]);
  //   } else {
  //     setAllAnswers(
  //       allAnswers.map((a, i) => {
  //         if (i === questionIndex) {
  //           // Update answer at question index
  //           return answerId;
  //         }
  //         return a;
  //       }),
  //     );
  //   }
  //   setQuestionIndex(questionIndex + 1);
  //   // get new question info from backend route (using resultantQuestionId)

  //   // actual one should make next component (with ref field)
  // };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Button
      id={answer.id}
      variant="outlined"
      onClick={(e) => onClick(e, answer.id, answer.resultantQuestionId)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '100%',
        textTransform: 'none',
        backgroundColor: isHover ? '#5204B94' : 'white',
        border: 'solid 1px #5204B9',
        color: 'black',
        borderRadius: '4px',
        padding: '6px 22px',
      }}
    >
      {answer.text}
    </Button>
  );
}

export default AnswerButton;
