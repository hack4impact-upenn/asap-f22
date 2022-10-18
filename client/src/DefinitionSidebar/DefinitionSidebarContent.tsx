import Box from '@mui/material/Box';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface DefinitionSidebarContentProps {
  toggleDrawer: (
    value: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => any;
  word: string;
  definition: string;
}

function DefinitionSidebarContent(props: DefinitionSidebarContentProps) {
  const { toggleDrawer, word, definition } = props;
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <List sx={{ maxWidth: 750 }}>
        <ListItem>
          <Typography variant="h2">{word}</Typography>
        </ListItem>
        <ListItem>
          <Typography paragraph>{definition}</Typography>
        </ListItem>
      </List>
    </Box>
  );
}

export default DefinitionSidebarContent;
