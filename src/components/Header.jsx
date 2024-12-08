import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { AppContext } from '../context/AppContext';

function Header({ mode, toggleMode }) {
  const { state } = useContext(AppContext);

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', padding: 0 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}>
            HearMeOut
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button component={Link} to="/" color="inherit" size="small">
              Older Adult View
            </Button>
            <Button component={Link} to="/volunteer" color="inherit" size="small">
              Volunteer Dashboard
            </Button>
            <Button component={Link} to="/profile" color="inherit" size="small">
              Profile
            </Button>
            <Button component={Link} to="/friends" color="inherit" size="small">
              Friends
            </Button>
            <Button component={Link} to="/scheduler" color="inherit" size="small">
              Scheduler
            </Button>
            <DarkModeToggle mode={mode} toggleMode={toggleMode} />
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              Logged in as: {state.userType === 'olderAdult' ? state.olderAdult.name : "Volunteer"}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
