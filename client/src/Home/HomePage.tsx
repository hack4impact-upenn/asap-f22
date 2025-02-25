import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
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
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>

        <Grid
          container
          direction="column"
          xs
          alignItems="center"
          justifyContent="center"
        >
          <Grid container direction="column" alignItems="center" marginTop={4}>
            <Typography
              sx={{
                fontSize: {
                  xs: '2.2rem', // Smaller font size for mobile
                  sm: '2.5rem', // Medium size for tablets
                  md: '3rem', // Larger size for desktops (h2 default)
                },
                px: { xs: 1.25, md: 4 },
                py: { xs: 3, md: 2 },
              }}
              fontWeight="bold"
              textAlign="center"
            >
              Abuse and Sexual Assault Resource Tree
            </Typography>

            <Grid
              item
              sx={{
                px: { xs: 2, md: 4 },
                pb: { xs: 3, md: 0 },
              }}
            >
              <Typography textAlign="center">
                Answer a few questions to find the resources you need. If you
                need immediate help, call Penn Police.
              </Typography>
            </Grid>

            <Grid
              container
              direction="column"
              alignItems="center"
              sx={{ p: { xs: 3, md: 8 } }}
            >
              <Button variant="contained" size="large" href="/question">
                Begin
              </Button>
              <Box padding={2}>
                <Button href="/all-resources" sx={{ textAlign: 'center' }}>
                  Or, view all on-campus resources.
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item width="100%">
          <Typography
            variant="body2"
            align="center"
            color="grayText"
            sx={{
              p: { xs: 2, md: 4 },
            }}
          >
            Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default HomePage;
