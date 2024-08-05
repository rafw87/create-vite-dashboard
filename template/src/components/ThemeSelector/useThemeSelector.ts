import { useContext } from 'react';
import light from '../../themes/light';
import { ThemeSelectorContext } from './ThemeSelectorContext';

export function useThemeSelector() {
  const data = useContext(ThemeSelectorContext);
  if (!data) {
    console.error('useThemeSelector must be called within <ThemeSelector /> element');
    return {
      theme: light,
      setTheme: () => {},
    };
  }
  return data;
}
