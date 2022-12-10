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
          direction="column"
          justifyContent="space-between"
          alignItems="center"
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
              <Typography variant="h2" fontWeight="bold" textAlign="center">
                {question.text}
              </Typography>
            </Grid>
            {question.resultantAnswers.map((answer) => {
              return (
                <ResourceDropdown
                  title={answer.text}
                  content={answer.resourceContent}
                />
              );
            })}
          </Grid>
        </Grid>
      </ScreenGrid>
    </div>
  );
}

export default ResourceComponent;
