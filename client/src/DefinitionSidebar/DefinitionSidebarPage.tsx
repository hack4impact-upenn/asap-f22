import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ScreenGrid from '../components/ScreenGrid';
import DefinitionSidebarContent from './DefinitionSidebarContent';

export default function DefinitionSidebarPage() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(value);
    };

  return (
    <ScreenGrid>
      <Typography variant="h2">This is an example</Typography>
      <Grid item container justifyContent="center">
        <Button onClick={toggleDrawer(true)}>Definition</Button>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <DefinitionSidebarContent
            toggleDrawer={toggleDrawer}
            word="Unknown Word"
            definition="
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. 
            "
          />
        </SwipeableDrawer>
      </Grid>
    </ScreenGrid>
  );
}
