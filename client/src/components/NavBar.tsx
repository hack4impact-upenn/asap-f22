import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useData } from '../util/api';

// import express from 'express';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from '../util/routes';

// let path = "";
// let authenticated = router.get("/authstatus")

function NavBar() {
  const navigate = useNavigate();
  const data = useData('auth/authstatus');
  let buttonText = 'Login';
  if (!(data === null)) {
    buttonText = !data.error ? 'Go to Question Table' : 'Login';
  }
  const routeChange = () => {
    // if authenticated --> question page
    // else login page
    // <DynamicRedirect unAuthPath="/login" authPath="/question" />;
    // console.log('before null data check route change login navbar');
    if (data === null) return null;
    // console.log('past null data check route change login navbar');
    return !data.error ? navigate('/admin-dashboard') : navigate('/login');
  };

  return (
    <Box sx={{ background: 'primary' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ASAP Resource Tree
          </Typography>
          <Button variant="contained" size="large" onClick={routeChange}>
            {buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
