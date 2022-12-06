import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import ScreenGrid from '../components/ScreenGrid';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function HomePage() {
  return (
    <ScreenGrid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        minHeight="100vh"
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>

        <Grid
          container
          height="100%"
          direction="column"
          xs
          alignItems="center"
          justifyContent="center"
        >
          <Grid container direction="column" alignItems="center" padding={2}>
            <Typography variant="h2" fontWeight="bold" textAlign="center">
              Abuse and Sexual Assault Resource Tree
            </Typography>

            <Grid item style={{ maxWidth: '600px' }}>
              <Typography textAlign="center">
                Answer a few questions to find the resources you need. If you
                need immediate help, call Penn Police.
              </Typography>
            </Grid>

            <Grid container direction="column" alignItems="center" padding={8}>
              <Button variant="contained" size="large">
                Begin
              </Button>
              <Box padding={2}>
                <Button>Or, See all resources instead</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" padding={2} alignItems="center">
          <Typography variant="body2" align="center" color="grayText">
            Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default HomePage;
