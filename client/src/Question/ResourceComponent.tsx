/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import { IQuestion } from '../util/types/question';
import ResourceDropdown from '../components/ResourceDropdown';

interface ResourceComponentProps {
  question: IQuestion;
}

function ResourceComponent(props: ResourceComponentProps) {
  const { question } = props;

  return (
    // eslint-disable-next-line no-underscore-dangle
    <div>
      <ScreenGrid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          height="100%"
        >
          <Grid
            container
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            // gap="2%"
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography variant="h2" fontWeight="bold" textAlign="center">
                Resources
              </Typography>
            </Grid>
            {question.resultantAnswers.map((answer) => {
              return (
                <Grid item margin="auto">
                  <ResourceDropdown
                    title={answer.text}
                    content={answer.resourceContent}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default ResourceComponent;
