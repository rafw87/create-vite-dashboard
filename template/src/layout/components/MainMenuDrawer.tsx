import { Divider, Drawer as MuiDrawer, DrawerProps, IconButton, styled, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DRAWER_WIDTH } from '../constants';

export type MenuProps = DrawerProps;

const Drawer = styled(MuiDrawer)(({ theme, open, variant }) => ({
  '& .MuiDrawer-paper': {
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),

    boxSizing: 'border-box',
    width: DRAWER_WIDTH,

    ...(variant === 'permanent' && {
      position: 'relative',
      width: DRAWER_WIDTH,
    }),
  },
}));

export const MainMenuDrawer = ({ onClose, children, ...drawerProps }: MenuProps) => {
  return (
    <Drawer onClose={onClose} {...drawerProps}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={(e) => onClose?.(e, 'backdropClick')}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {children}
    </Drawer>
  );
};
