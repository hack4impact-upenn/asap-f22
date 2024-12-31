import React, { useState } from 'react';
import {
  Typography,
  Grid,
  ListItem,
  List,
  AppBar,
  Toolbar,
} from '@mui/material';
import Box from '@mui/system/Box';
import ScreenGrid from '../components/ScreenGrid';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function AboutThisProjectPage() {
  return (
    <ScreenGrid>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
        }}
      >
        <NavBar />
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: '64px',
          mb: '74px',
          px: 0,
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              textAlign="center"
              paddingTop={4}
              paddingBottom={2}
            >
              Guide to Interpersonal Resources at Penn
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            xs={12}
            alignItems="flex-start"
            justifyContent="center"
          >
            <Grid
              container
              direction="column"
              xs={5}
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
                <Typography variant="h5" textAlign="left">
                  How does this work?
                </Typography>

                <Typography textAlign="left">
                  Anyone who visits this website can answer questions that may
                  may relate to a situation of interpersonal violence that they
                  or a friend have experienced. We will provide definitions
                  along the way, and try to help users navigate resources on
                  campus and in in Philadelphia.
                </Typography>
              </Grid>

              <Grid
                container
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                padding={2}
              >
                <Typography variant="h5" textAlign="left">
                  Why are we doing this?
                </Typography>

                <Typography textAlign="left">
                  This is an app by students and for students. We understand
                  that navigating resources can sometimes be overwhelming,
                  scary, and disheartening. We want to help students explore
                  their options, and hopefully connect them with a resource that
                  can give them the support they deserve.
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              xs={5}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Grid
                container
                direction="column"
                alignItems="flex-start"
                padding={2}
              >
                <Typography variant="h5" textAlign="left">
                  Who created this guide?
                </Typography>

                <Typography textAlign="left">
                  This app was founded by Abuse and Sexual Assault Prevention at
                  Penn (ASAP) in collaboration with Hack4Impact. Both groups are
                  undergraduate clubs at the University of Pennsylvania.
                  Hack4Impact created the webpage you are seeing while ASAP
                  curated the content with the help from the following offices
                  at Penn:
                </Typography>

                <Box paddingTop={0} paddingLeft={2}>
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
          </Grid>
        </Grid>
      </Box>

      <Box
        position="fixed"
        bottom="0px"
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Footer />
      </Box>
    </ScreenGrid>
  );
}

export default AboutThisProjectPage;
