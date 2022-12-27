import * as React from 'react';
import { Button } from '@mui/material';

interface NextButtonProps {
  onClick: any;
}

function NextButton(props: NextButtonProps) {
  const { onClick } = props;

  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Button
      id="next"
      onClick={(e) => onClick(e)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: '96px',
        height: '39px',
        textTransform: 'none',
        backgroundColor: '#EEEEEE',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '6px 16px 6px 12px',
        gap: '8px',
        position: 'fixed',
        left: '66.61%',
        right: '26.72%',
        top: '75.45%',
        bottom: '10.74%',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '14px',
      }}
    >
      NEXT
    </Button>
  );
}

export default NextButton;
