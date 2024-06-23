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
        <Box
          component="img"
          sx={{
            height: 42,
            width: 36.96,
          }}
          alt="Penn Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Shield_of_the_University_of_Pennsylvania.svg/1200px-Shield_of_the_University_of_Pennsylvania.svg.png"
        />
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
