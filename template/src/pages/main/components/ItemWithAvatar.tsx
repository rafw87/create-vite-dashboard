import { ReactNode } from 'react';
import { Avatar, Link, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export type ItemWithAvatarProps = {
  title: string;
  link: string;
  avatar: ReactNode;
};

export const ItemWithAvatar = ({ title, link, avatar }: ItemWithAvatarProps) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Link href={link} target="_blank">
            {link}
          </Link>
        }
      />
    </ListItem>
  );
};
