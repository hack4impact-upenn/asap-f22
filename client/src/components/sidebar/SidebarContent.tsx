import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import SidebarContentItem from './SidebarContentItem';

export default function SidebarContent() {
  return (
    <div>
      <Toolbar />
      <List>
        {['These', 'Are', 'Some', 'Example', 'Definitions'].map((text) => (
          <ListItem>
            <SidebarContentItem
              title={text}
              definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
