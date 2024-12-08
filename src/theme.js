// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          background: { default: '#fafafa', paper: '#ffffff' }, // Added paper
        }
      : {
          primary: { main: '#90caf9' },
          background: { default: '#121212', paper: '#1e1e1e' }, // Added paper
        })
  },
  typography: {
    h1: { fontSize: '2.2rem', fontWeight: 600, marginBottom: '1rem' },
    h2: { fontSize: '1.8rem', fontWeight: 500, marginBottom: '1rem' },
    h3: { fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none' },
  },
});

export default theme;
