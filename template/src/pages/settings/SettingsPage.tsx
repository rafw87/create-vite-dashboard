import { useMemo } from 'react';
import { FormControl, FormLabel, Paper, Theme, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useThemeSelector } from '@/components';
import { lightTheme, darkTheme } from '../../themes';

export const SettingsPage = () => {
  const { theme: currentTheme, setTheme } = useThemeSelector();
  const themes = useMemo(
    () => [
      {
        label: 'Light',
        theme: lightTheme,
      },
      {
        label: 'Dark',
        theme: darkTheme,
      },
    ],
    [],
  );

  const handleChangeTheme = (_: unknown, newTheme: Theme) => {
    if (newTheme) {
      setTheme(newTheme);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Settings
        </Typography>
        <FormControl>
          <FormLabel>Theme</FormLabel>
          <ToggleButtonGroup
            title="Theme"
            color="primary"
            value={currentTheme}
            exclusive
            onChange={handleChangeTheme}
            aria-label="Theme"
          >
            {themes.map(({ label, theme }) => (
              <ToggleButton key={label} value={theme}>
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </FormControl>
      </Paper>
    </>
  );
};
