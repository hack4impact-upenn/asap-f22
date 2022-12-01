import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionComponent from './QuestionComponent';
// import ResourceComponent from './ResourceComponent';
import { IQuestion } from '../util/types/question';
import { IAnswer } from '../util/types/answer';
import { IResource } from '../util/types/resource';
import { getData, useData } from '../util/api';

function ResourcePage() {
  return (
    <ScreenGrid>
      <div>
        <Typography>hello</Typography>
      </div>
    </ScreenGrid>
  );
}

export default ResourcePage;
