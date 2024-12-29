import React from 'react';
import { Typography, Grid } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionTable from './QuestionTable';
import NavBar from '../components/NavBar';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function AdminDashboardPage() {
  return (
    <ScreenGrid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        height="100vh"
        fit-content="100%"
      >
        <Grid item width="100%">
          <NavBar />
        </Grid>
        <Grid item marginX="auto">
          <Typography variant="h2">Welcome to the Admin Dashboard</Typography>

          <div style={{ height: '60vh', width: '60vw' }}>
            {/* <UserTable /> */}
            <QuestionTable />
          </div>
        </Grid>
      </Grid>
    </ScreenGrid>
  );
}

export default AdminDashboardPage;
