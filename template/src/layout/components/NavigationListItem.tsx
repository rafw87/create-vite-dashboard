import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export type NavigationItemProps = PropsWithChildren<{
  icon?: ReactNode;
  to: string;
}>;

export const NavigationListItem = forwardRef<HTMLLIElement, NavigationItemProps>(function NavigationItemWithRef(
  { icon, to, children },
  ref,
) {
  const match = useMatch(to);
  return (
    <ListItem disablePadding ref={ref}>
      <ListItemButton component={NavLink} to={to} selected={Boolean(match)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
});
