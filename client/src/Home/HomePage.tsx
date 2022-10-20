import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/system/Box';
import { useAppDispatch, useAppSelector } from '../util/redux/hooks';
import {
  logout as logoutAction,
  toggleAdmin,
  selectUser,
} from '../util/redux/userSlice';
import { logout as logoutApi, selfUpgrade } from './api';
import ScreenGrid from '../components/ScreenGrid';
import PrimaryButton from '../components/buttons/PrimaryButton';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

interface PromoteButtonProps {
  admin: boolean | null;
  handleSelfPromote: () => void;
  navigator: NavigateFunction;
}

/**
 * A button which, when clicked, will promote the user to admin. If the user is already admin, the button will be a link to the admin dashboard.
 * @param admin - a boolean indicating whether the user is an admin
 * @param handleSelfPromote - a function which promotes the user to admin
 * @param navigator - a function which navigates to a new page (passed in from parent function)
 */
function PromoteButton({
  admin,
  handleSelfPromote,
  navigator,
}: PromoteButtonProps) {
  if (admin === null) {
    return null;
  }
  return !admin ? (
    <PrimaryButton variant="contained" onClick={handleSelfPromote}>
      Promote self to admin
    </PrimaryButton>
  ) : (
    <PrimaryButton
      variant="contained"
      onClick={() => navigator('/users', { replace: true })}
    >
      View all users
    </PrimaryButton>
  );
}
/**
 * The HomePage of the user dashboard. Displays a welcome message, a logout button and a button to promote the user to admin if they are not already an admin. If the user is an admin, the button will navigate them to the admin dashboard. This utilizes redux to access the current user's information.
 */
function HomePage() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [admin, setAdmin] = useState(user.admin);
  const logoutDispatch = () => dispatch(logoutAction());
  const handleLogout = async () => {
    if (await logoutApi()) {
      logoutDispatch();
      navigator('/login', { replace: true });
    }
  };

  const handleSelfPromote = async () => {
    const newAdminStatus = await selfUpgrade(user.email as string);
    if (newAdminStatus) {
      dispatch(toggleAdmin());
      setAdmin(true);
    }
  };

  const message = `Welcome to the Boilerplate, ${user.firstName} ${user.lastName}!`;
  return (
    <ScreenGrid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>

        <Grid
          container
          height="100%"
          direction="column"
          xs
          alignItems="center"
          justifyContent="center"
        >
          <Grid container direction="column" alignItems="center" padding={2}>
            <Typography variant="h2" fontWeight="bold" textAlign="center">
              Abuse and Sexual Assault Resource Tree
            </Typography>

            <Grid item style={{ maxWidth: '600px' }}>
              <Typography textAlign="center">
                Answer a few questions to find the resources you need. If you
                need immediate help, call Penn Police.
              </Typography>
            </Grid>

            <Grid container direction="column" alignItems="center" padding={8}>
              <Button variant="contained" size="large">
                Begin
              </Button>
              <Box padding={2}>
                <Button>Or, See all resources instead</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column" padding={2} alignItems="center">
          <Typography variant="body2" align="center" color="grayText">
            Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Footer />
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default HomePage;
