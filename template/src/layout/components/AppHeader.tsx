import { AppBar, AppBarProps, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode } from 'react';
import { Profile } from './Profile';

export type AppHeaderProps = AppBarProps & {
  title: string;
  toggleDrawer: () => void;
  isMobile: boolean;
  profileMenu: (handleClose: () => void) => ReactNode;
};

export const AppHeader = ({ title, toggleDrawer, isMobile, profileMenu, ...appBarProps }: AppHeaderProps) => {
  return (
    <AppBar
      position="absolute"
      sx={{ zIndex: (theme) => (isMobile ? undefined : theme.zIndex.drawer + 1) }}
      {...appBarProps}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Profile menu={profileMenu} />
      </Toolbar>
    </AppBar>
  );
};
