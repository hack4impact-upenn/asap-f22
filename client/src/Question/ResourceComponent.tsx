/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Typography, Grid } from '@mui/material';
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
          <Grid container direction="column" alignItems="center" padding={2}>
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign="center"
              sx={{
                fontSize: {
                  xs: '1.75rem', // Smaller font size for mobile
                  sm: '2.5rem', // Medium size for tablets
                  md: '3rem', // Larger size for desktops (h2 default)
                },
              }}
            >
              Resources
            </Typography>
          </Grid>
          {question.resultantAnswers.map((answer) => {
            return (
              <Grid item marginTop="1%" width="100%" key={answer._id}>
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
