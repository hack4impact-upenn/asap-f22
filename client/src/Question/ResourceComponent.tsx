import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Grid, ListItemSecondaryAction } from '@mui/material';
import Box from '@mui/system/Box';
import { ViewComfyAltOutlined } from '@mui/icons-material';
import ScreenGrid from '../components/ScreenGrid';
import AnswerButton from './AnswerButton';
import { IAnswer } from '../util/types/answer';
import { IResource } from '../util/types/resource';
import { IQuestion } from '../util/types/question';
import { getData, useData } from '../util/api';
import ResourceDropdown from '../components/ResourceDropdown';

interface ResourceComponentProps {
  question: IQuestion;
}

function ResourceComponent(props: ResourceComponentProps) {
  const { question } = props;

  const [resource, setResource] = useState({
    _id: '',
    title: '',
    content: '',
  } as IResource);

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
              <Typography variant="h1" fontWeight="bold" textAlign="center">
                Resources
              </Typography>
            </Grid>
            {question.resultantAnswers.map((answer) => {
              const answerID = answer.id;
              const nextResource = getData(`resource/get-resource/${answerID}`);

              (async () => {
                const fetchData = async () => {
                  const res = await nextResource;
                  console.log(res);
                  // setCurrentQuestion(res.data);
                  setResource({
                    // eslint-disable-next-line no-underscore-dangle
                    _id: res.data._id,
                    title: res.data.title,
                    content: res.data.content,
                  } as IResource);
                };
                fetchData();
              })();

              return (
                <ResourceDropdown
                  title={resource.title}
                  content={resource.content}
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
