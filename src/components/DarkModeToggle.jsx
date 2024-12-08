import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

function DarkModeToggle({ mode, toggleMode }) {
  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

export default DarkModeToggle;
