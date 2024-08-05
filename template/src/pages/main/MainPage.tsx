import { List, Paper, Typography } from '@mui/material';
import {
  MuiLogo,
  ReactLogo,
  ReactRouterLogo,
  ViteLogo,
  TypescriptLogo,
  ESLintLogo,
  PrettierLogo,
} from '@/assets/images';
import { ItemWithAvatar } from './components/ItemWithAvatar';

export const MainPage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Main page
      </Typography>
      <List>
        <ItemWithAvatar title="React" link="https://react.dev" avatar={<ReactLogo />} />
        <ItemWithAvatar title="React Router" link="https://reactrouter.com" avatar={<ReactRouterLogo />} />
        <ItemWithAvatar title="Material UI" link="https://mui.com/material-ui/getting-started" avatar={<MuiLogo />} />
        <ItemWithAvatar title="Typescript" link="https://www.typescriptlang.org/docs" avatar={<TypescriptLogo />} />
        <ItemWithAvatar title="Vite" link="https://vitejs.dev/guide" avatar={<ViteLogo />} />
        <ItemWithAvatar title="ESLint" link="https://eslint.org" avatar={<ESLintLogo />} />
        <ItemWithAvatar title="Prettier" link="https://prettier.io" avatar={<PrettierLogo />} />
      </List>
    </Paper>
  );
};
