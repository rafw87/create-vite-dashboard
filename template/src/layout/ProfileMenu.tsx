import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { MenuActionItem } from './components/MenuActionItem';

export type ProfileMenuProps = {
  handleClose: () => void;
};
export const ProfileMenu = ({ handleClose }: ProfileMenuProps) => {
  return (
    <>
      <MenuActionItem icon={<PersonIcon />} onClick={handleClose}>
        Profile
      </MenuActionItem>
      <MenuActionItem icon={<LogoutIcon />} onClick={handleClose}>
        Logout
      </MenuActionItem>
    </>
  );
};
