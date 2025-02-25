import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SidebarContent from './SidebarContent';
import Footer from '../Footer';
import { IQuestion } from '../../util/types/question';
import NavBar from '../NavBar';

const drawerWidth = 260;

interface Props {
  window?: () => Window;
  currentQuestion: IQuestion;
  children: JSX.Element;
}

export default function SidebarComponent(props: Props) {
  const { window, currentQuestion, children } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} width="100vw" height="100vh">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <NavBar />
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: '64px',
          mb: '74px',
          px: 0,
          overflowY: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
            mr: 4,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ color: 'primary.main' }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
      {drawerOpen && (
        <Box
          component="nav"
          marginTop="64px"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            container={container}
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                paddingBottom: '50px',
                marginTop: '64px',
              },
            }}
            anchor="right"
          >
            <SidebarContent currentQuestion={currentQuestion} />
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="temporary"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                marginTop: '64px',
                paddingBottom: '50px',
                marginBotton: '74px',
              },
            }}
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            <SidebarContent currentQuestion={currentQuestion} />
          </Drawer>
        </Box>
      )}
      <Box
        position="fixed"
        bottom="0px"
        sx={{
          flexGrow: 1,
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
