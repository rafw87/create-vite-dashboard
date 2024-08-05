import { createContext } from 'react';
import { Theme } from '@mui/material';

export type ThemeSelectorContextData = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeSelectorContext = createContext<ThemeSelectorContextData | null>(null);
