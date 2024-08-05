import { PropsWithChildren } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeSelector } from '@/components';
import { lightTheme } from './themes';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeSelector defaultTheme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeSelector>
  );
};
