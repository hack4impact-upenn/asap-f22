import React from 'react';
import { Typography, AppBar, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ScreenGrid from '../components/ScreenGrid';
import QuestionTable from './Tables/QuestionTable';
import ResourceTable from './Tables/ResourceTable';
import DefinitionTable from './Tables/DefinitionTable';
import NavBar from '../components/NavBar';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';
import UserTable from './Tables/UserTable';

/**
 * A page only accessible to admins that displays all users in a table and allows
 * Admin to delete users from admin and promote users to admin.
 */
function AdminDashboardPage() {
  const [value, setValue] = React.useState('questions');

  // determine if user is an admin
  const self = useAppSelector(selectUser);

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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
              <Tab label="Questions" value="questions" />
              <Tab label="Resources" value="resources" />
              <Tab label="Definitions" value="definitions" />
              {self.admin && <Tab label="Users" value="users" />}
            </Tabs>
          </Box>
          {value === 'questions' && (
            <div
              style={{
                marginTop: '30px',
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
          )}
          {value === 'resources' && (
            <div
              style={{
                marginTop: '30px',
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
          )}
          {value === 'definitions' && (
            <div
              style={{
                marginTop: '30px',
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
          )}
          {value === 'users' && self.admin && (
            <div
              style={{
                marginTop: '30px',
                marginBottom: '40px',
              }}
            >
              <Typography variant="h5" marginBottom="10px">
                Users
              </Typography>
              <div style={{ width: '100%', height: '60vh' }}>
                <UserTable />
              </div>
            </div>
          )}
        </div>
      </Box>
    </ScreenGrid>
  );
}

export default AdminDashboardPage;
