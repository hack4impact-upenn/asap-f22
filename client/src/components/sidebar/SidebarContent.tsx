/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import SidebarContentItem from './SidebarContentItem';
import { IQuestion } from '../../util/types/question';
import { getData, useData } from '../../util/api';
import { IDefinition } from '../../util/types/definition';

interface SidebarProps {
  currentQuestion: IQuestion;
}

export default function SidebarContent(props: SidebarProps) {
  const { currentQuestion } = props;

  const [definitions, setDefinitions] = useState<IDefinition[]>([]);

  const definitionResponse = useData(
    `definition/get-definitions-for-question/${currentQuestion._id}`,
  );

  useEffect(() => {
    if (definitionResponse != null) {
      setDefinitions(definitionResponse.data);
    }
  }, [definitionResponse]);

  // (async () => {
  //   const fetchData = async () => {
  //     const res = await definitionResponse;
  //     // setCurrentQuestion(res.data);
  //     console.log(res);
  //   };
  //   fetchData();
  // })();

  return (
    <div>
      <Toolbar />
      <List>
        <ListItem>
          <h1>Definitions</h1>
        </ListItem>
        {definitions.map((definition) => (
          <ListItem>
            <SidebarContentItem
              title={definition.word}
              definition={definition.definition}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
