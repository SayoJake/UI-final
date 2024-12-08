// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout'; // Optional Layout Component
import OlderAdultView from './pages/OlderAdultView';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import SchedulerPage from './pages/SchedulerPage';
import theme from './theme';
import { AppProvider } from './context/AppContext';

function App() {
  const [mode, setMode] = useState('light');
  const currentTheme = theme(mode);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <Header mode={mode} toggleMode={toggleMode} />
          {/* Main Content Area */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              bgcolor: 'background.default', 
              minHeight: 'calc(100vh - 64px)', // Adjust based on Header height
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Layout>
              <Routes>
                <Route path="/" element={<OlderAdultView />} />
                <Route path="/volunteer" element={<VolunteerDashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/scheduler" element={<SchedulerPage />} />
              </Routes>
            </Layout>
          </Box>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
