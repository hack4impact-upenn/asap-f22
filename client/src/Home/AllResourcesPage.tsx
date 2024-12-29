import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import ResourceComponent from '../Question/ResourceComponent';
import SidebarComponent from '../components/sidebar/SidebarComponent';
import { getData } from '../util/api';
import { IQuestion } from '../util/types/question';

function AllResourcesPage() {
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null,
  );
  useEffect(() => {
    const resources = getData(`question/get-question/000000180000000000000000`);
    (async () => {
      const fetchData = async () => {
        const res = await resources;
        setCurrentQuestion({
          // eslint-disable-next-line no-underscore-dangle
          _id: res.data._id,
          text: res.data.text,
          isQuestion: res.data.isQuestion,
          resultantAnswers: res.data.resultantAnswers,
        });
      };
      fetchData();
    })();
  }, []);

  if (!currentQuestion) {
    return (
      <ScreenGrid>
        <CircularProgress />
      </ScreenGrid>
    );
  }

  return (
    <ScreenGrid>
      <SidebarComponent currentQuestion={currentQuestion}>
        <Box justifyContent="space-between" height="100%" margin="auto">
          <Box width="50%" margin="auto">
            <ResourceComponent question={currentQuestion} />
          </Box>
        </Box>
      </SidebarComponent>
    </ScreenGrid>
  );
}

export default AllResourcesPage;
