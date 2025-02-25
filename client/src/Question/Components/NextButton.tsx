import * as React from 'react';
import { Button } from '@mui/material';

interface NextButtonProps {
  onClick: any;
}

function NextButton(props: NextButtonProps) {
  const { onClick } = props;

  return (
    <Button
      id="next"
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: '#EEEEEE',
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'fixed',
        right: '5%',
        bottom: '15%',
        width: '100px',
      }}
    >
      NEXT
    </Button>
  );
}

export default NextButton;
