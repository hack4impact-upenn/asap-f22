import * as React from 'react';
import { Button } from '@mui/material';

interface BackButtonProps {
  onClick: any;
}

function BackButton(props: BackButtonProps) {
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
      id="rback"
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
        position: 'absolute',
        left: '4.72%',
        right: '88.61%',
        top: '80.45%',
        bottom: '15.74%',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '14px',
      }}
    >
      BACK
    </Button>
  );
}

export default BackButton;
