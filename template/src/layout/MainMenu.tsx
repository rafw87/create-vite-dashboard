import { Box, List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavigationListItem } from './components/NavigationListItem';

export const MainMenu = () => {
  return (
    <>
      <List>
        <NavigationListItem to="/" icon={<HomeIcon />}>
          Home
        </NavigationListItem>
        <NavigationListItem to="/example" icon={<ArticleIcon />}>
          Example Page
        </NavigationListItem>
      </List>
      <Box flexGrow={1} />
      <List>
        <NavigationListItem to="/settings" icon={<SettingsIcon />}>
          Settings
        </NavigationListItem>
      </List>
    </>
  );
};
