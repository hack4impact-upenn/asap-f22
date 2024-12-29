import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../util/api';

// let path = "";
// let authenticated = router.get("/authstatus")

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = useData('auth/authstatus');
  let buttonText = 'Login';
  if (!(data === null)) {
    if (data.error) {
      buttonText = 'Login';
    } else if (!data.error && location.pathname === '/admin-dashboard') {
      buttonText = 'Go to User View';
    } else {
      buttonText = 'Go to Admin Dashboard';
    }
  }
  const routeChange = () => {
    // if authenticated --> question page
    // else login page
    // <DynamicRedirect unAuthPath="/login" authPath="/question" />;
    // console.log('before null data check route change login navbar');
    if (data === null) return null;
    // console.log('past null data check route change login navbar');
    if (data.error) {
      return navigate('/login');
    }
    if (location.pathname === '/admin-dashboard') {
      return navigate('/home');
    }
    return navigate('/admin-dashboard');
  };

  return (
    <Box sx={{ background: 'primary' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            ASAP Resource Tree
          </Typography>
          <Button
            variant="contained"
            disableElevation
            size="large"
            onClick={routeChange}
          >
            {buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
