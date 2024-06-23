import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  Typography,
  Grid,
  ListItem,
  ListItemText,
  ListSubheader,
  List,
} from '@mui/material';
import Box from '@mui/system/Box';
import ScreenGrid from '../components/ScreenGrid';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function AboutThisProjectPage() {
  return (
    <ScreenGrid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        height="100vh"
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>

        <Grid item width="100%" justifyContent="flex-start">
          <Typography variant="h3" fontWeight="bold" textAlign="center">
            Guide to Interpersonal Resources at Penn
          </Typography>
        </Grid>

        <Grid
          container
          direction="column"
          xs={6}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            padding={2}
          >
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              padding={4}
            >
              <Typography variant="h2" fontWeight="bold" textAlign="left">
                How does this work?
              </Typography>

              <Typography textAlign="left">
                Anyone who visits this website can answer questions that may may
                relate to a situation of interpersonal violence that they or a
                friend have experienced. We will provide definitions along the
                way, and try to help users navigate resources on campus and in
                in Philadelphia.
              </Typography>
            </Grid>

            <Grid
              container
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              padding={4}
            >
              <Typography variant="h2" fontWeight="bold" textAlign="left">
                Why are we doing this?
              </Typography>

              <Typography textAlign="left">
                This is an app by students and for students. We understand that
                navigating resources can sometimes be overwhelming, scary, and
                disheartening. We want to help students explore their options,
                and hopefully connect them with a resource that can give them
                the support they deserve.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          xs={6}
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            padding={4}
          >
            <Typography variant="h2" fontWeight="bold" textAlign="left">
              Who created this guide?
            </Typography>

            <Typography textAlign="left">
              This app was founded by Abuse and Sexual Assault Prevention at
              Penn (ASAP) in collaboration with Hack4Impact. Both groups are
              undergraduate clubs at the University of Pennsylvania. Hack4Impact
              created the webpage you are seeing while ASAP curated the content
              with the help from the following offices at Penn:
            </Typography>

            <Box padding={2}>
              <List sx={{ listStyleType: 'disc' }}>
                <ListItem sx={{ display: 'list-item' }}>
                  Penn Violence Prevention
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  Penn Womens Center
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                  Special Services
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          width="100%"
          alignItems="flex-end"
          padding={0}
          spacing={0}
          position="fixed"
          bottom={0}
        >
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default AboutThisProjectPage;
