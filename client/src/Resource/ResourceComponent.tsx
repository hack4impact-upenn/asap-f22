import React, { useState } from 'react';
import { Typography, Grid, Stack, Box } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ScreenGrid from '../components/ScreenGrid';
import PopupWarning from '../components/PopupWarning';
import ResourceDropdown from './ResourceDropdown';
import { IResource } from '../util/types/resource';
import BackButton from './BackButton';
import StartOverButton from './StartOverButton';
import ConfirmationModal from '../components/ConfirmationModal';

interface ResourceComponentProps {
  resources: IResource[];
}

function ResourceComponent(props: ResourceComponentProps) {
  const { resources } = props;
  const navigate = useNavigate();

  // const popUp = () => {
  async function handleNav() {
    navigate('/home');
  }
  async function popUp() {
    console.log('popup');
    return (
      <ConfirmationModal
        buttonText="RESTART"
        title="Are you sure you want to start over?"
        body="This action is permanent. You will return to the home page."
        onConfirm={() => handleNav()}
      />
    );
    handleNav();
  }

  return (
    <div>
      <ScreenGrid>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          min-height="100vh"
          height="100%"
          fit-content="100%"
        >
          <Grid
            container
            height="100%"
            direction="column"
            alignItems="center"
            justifyContent="space-in"
            gap="2%"
          >
            <Grid container direction="column" alignItems="center" padding={2}>
              <Typography variant="h1" fontWeight="bold" textAlign="center">
                Resources
              </Typography>
            </Grid>
            {resources.map((resource) => {
              return (
                <Stack spacing={2}>
                  <ResourceDropdown
                    title={resource.id}
                    content={resource.information}
                  />
                  <Box />
                </Stack>
              );
            })}
          </Grid>
          <Grid>
            <BackButton
              onClick={(e: any) => {
                console.log('click');
              }}
            />
            <StartOverButton
              onClick={(e: any) => {
                console.log('start over clicked');
                // // add in popup
                // navigate('/home');
                popUp();
              }}
            />
          </Grid>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default ResourceComponent;
