import React from 'react';
import { Typography, AppBar, Box } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid';
import QuestionTable from './Tables/QuestionTable';
import ResourceTable from './Tables/ResourceTable';
import DefinitionTable from './Tables/DefinitionTable';
import NavBar from '../components/NavBar';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function AdminDashboardPage() {
  return (
    <ScreenGrid>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
        }}
      >
        <NavBar />
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: '64px',
          px: 0,
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <div
          style={{
            margin: 'auto',
            width: '70vw',
            marginTop: '60px',
            marginBottom: '60px',
          }}
        >
          <Typography variant="h2">Welcome to the Admin Dashboard</Typography>
          <div
            style={{
              marginTop: '20px',
              marginBottom: '40px',
            }}
          >
            <Typography variant="h5" marginBottom="10px">
              Questions
            </Typography>
            <div style={{ width: '100%', height: '60vh' }}>
              <QuestionTable />
            </div>
          </div>
          <div
            style={{
              marginTop: '40px',
              marginBottom: '40px',
            }}
          >
            <Typography variant="h5" marginBottom="10px">
              Resources
            </Typography>
            <div style={{ width: '100%', height: '60vh' }}>
              <ResourceTable />
            </div>
          </div>
          <div
            style={{
              marginTop: '40px',
              marginBottom: '40px',
            }}
          >
            <Typography variant="h5" marginBottom="10px">
              Definitions
            </Typography>
            <div style={{ width: '100%', height: '60vh' }}>
              <DefinitionTable />
            </div>
          </div>
        </div>
      </Box>
    </ScreenGrid>
  );
}

export default AdminDashboardPage;
