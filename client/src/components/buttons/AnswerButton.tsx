import * as React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface AnswerButtonProps {
  id: string;
  text: string;
  resultantQuestionId: string;
  onClick: any;
  // allAnswers: string[];
  // questionIndex: number;
}

function AnswerButton(props: AnswerButtonProps) {
  const { id, text, resultantQuestionId, onClick } = props;

  const [isHover, setIsHover] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [allAnswers, setAllAnswers] = React.useState<string[]>([]);

  // temp click handler -- should appear on page that has entire question component
  const clickHandler = (
    // event: any,
    answerId: string,
    // resultantQuestionId: string,
  ) => {
    // these should be part of state (like above)
    setAllAnswers(
      allAnswers.map((a, i) => {
        if (i === questionIndex) {
          // Increment the clicked counter
          return answerId;
        }
        // The rest haven't changed
        return a;
      }),
    );
    setQuestionIndex(questionIndex + 1);
    // get new question info from backend route (using resultantQuestionId)

    // actual one should make next component (with ref field) + scroll to it
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Button
      variant="outlined"
      onClick={(e) => onClick(e, id, resultantQuestionId)}
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
      {text}
    </Button>
  );
}

export default AnswerButton;
