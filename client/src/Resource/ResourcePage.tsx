import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import ScreenGrid from '../components/ScreenGrid';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import ResourceComponent from './ResourceComponent';
import { IResource } from '../util/types/resource';

function ResourcePage() {
  const testr = {
    id: 'resource',
    information: 'information',
  } as IResource;

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
          sx={{ marginBottom: '0px', paddingBottom: '0px' }}
          height="100%"
          container
          direction="column"
          xs
          alignItems="center"
          justifyContent="space-between"
        >
          <ResourceComponent resources={[testr, testr, testr]} />
        </Grid>
        <Grid item width="100%">
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default ResourcePage;
