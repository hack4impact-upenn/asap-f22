import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';

export default function Footer() {
  const params = window.location.pathname;
  const isAbout = params === '/about';
  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        sx={{ backgroundColor: '#D9D9D9' }}
      >
        <Button color="error" size="large" href="https://www.google.com">
          Quick Exit
        </Button>
        <Button
          color="primary"
          size="medium"
          endIcon={<ArrowForward />}
          href={isAbout ? '/question' : '/about'}
        >
          {isAbout ? 'Ask a Question' : 'About This Project'}
        </Button>
      </Stack>
    </div>
  );
}
