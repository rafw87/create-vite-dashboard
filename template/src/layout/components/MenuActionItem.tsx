import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

export type MenuActionButtonProps = PropsWithChildren<{
  icon?: ReactNode;
  onClick: () => void;
}>;

export const MenuActionItem = forwardRef<HTMLLIElement, MenuActionButtonProps>(function MenuActionButtonWithRef(
  { icon, onClick, children },
  ref,
) {
  return (
    <MenuItem ref={ref} onClick={() => onClick()}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={children} />
    </MenuItem>
  );
});
