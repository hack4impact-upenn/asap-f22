import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NavBar() {
  return (
    <Box sx={{ background: 'primary' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ASAP Resource Tree
          </Typography>
          <Button color="primary">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
