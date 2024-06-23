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
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        fit-content="100%"
        height="100%"
      >
        <Grid
          container
          height="100%"
          direction="column"
          alignItems="center"
          fit-content="100%"
          justifyContent="space-in"
          gap="2%"
        >
          <Grid container direction="column" alignItems="center">
            <Typography variant="h2" fontWeight="bold" textAlign="center">
              Resources
            </Typography>
          </Grid>
          {question.resultantAnswers.map((answer) => {
            console.log(answer.resourceContent);
            return (
              <Grid item margin="auto" marginTop="1%">
                <ResourceDropdown
                  title={answer.text}
                  content={answer.resourceContent}
                  link={answer.resourceLink}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default ResourceComponent;
