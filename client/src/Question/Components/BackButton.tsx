import * as React from 'react';
import { Button } from '@mui/material';

interface BackButtonProps {
  onClick: any;
}

function BackButton(props: BackButtonProps) {
  const { onClick } = props;

  return (
    <Button
      id="qback"
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: '#EEEEEE',
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'fixed',
        left: '5%',
        bottom: '15%',
        width: '100px',
      }}
    >
      BACK
    </Button>
  );
}

export default BackButton;
