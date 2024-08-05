import { PropsWithChildren, useState } from 'react';
import { Box, Container, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { AppHeader } from './components/AppHeader';
import { MainMenuDrawer } from './components/MainMenuDrawer';
import { MainMenu } from './MainMenu';
import { ProfileMenu } from './ProfileMenu';

export const Layout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader
        isMobile={isMobile}
        toggleDrawer={toggleDrawer}
        title={'Example App'}
        profileMenu={(handleClose) => <ProfileMenu handleClose={handleClose} />}
      />
      <MainMenuDrawer variant={isMobile ? 'temporary' : 'permanent'} open={open} onClose={closeDrawer}>
        <MainMenu />
      </MainMenuDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
