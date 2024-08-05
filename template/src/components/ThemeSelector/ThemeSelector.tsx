import { PropsWithChildren, useState } from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import light from '../../themes/light';
import { ThemeSelectorContext } from './ThemeSelectorContext';

export type ThemeSelectorProps = PropsWithChildren<{
  defaultTheme?: Theme;
}>;

export const ThemeSelector = ({ defaultTheme, children }: ThemeSelectorProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme ?? light);

  return (
    <ThemeSelectorContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeSelectorContext.Provider>
  );
};
