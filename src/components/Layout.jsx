// src/components/Layout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header'; // Ensure Header is included if not already

const Layout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header can be included here or managed in App.jsx */}
      <Container maxWidth="md" sx={{ py: 2, backgroundColor: 'transparent' }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
