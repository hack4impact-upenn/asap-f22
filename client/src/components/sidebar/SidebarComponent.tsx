import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
        {/* <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            ASAP Resource Tree
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar> */}
        <NavBar />
      </AppBar>
      <Box
        component="main"
        sx={{
          mt: '64px',
          mb: '74px',
          px: 0,
          overflowY: 'auto',
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ p: 0 }} />
        {children}
        <div style={{ height: '64px' }} />
      </Box>
      <Box
        component="nav"
        marginTop="64px"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              marginTop: '64px',
            },
          }}
          anchor="right"
        >
          <SidebarContent currentQuestion={currentQuestion} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              marginTop: '64px',
            },
          }}
          anchor="right"
          open
        >
          <SidebarContent currentQuestion={currentQuestion} />
        </Drawer>
      </Box>
      <Box
        position="fixed"
        bottom="0px"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
