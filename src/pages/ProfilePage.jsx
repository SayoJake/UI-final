// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';
import { AppContext } from '../context/AppContext';
import ProfileEditor from '../components/ProfileEditor';

function ProfilePage() {
  const { state } = useContext(AppContext);

  return (
    <Container maxWidth="md" sx={{ py: 2, bgcolor: 'transparent' }}>
      <Typography variant="h1">Your Profile</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2, mt: 1 }}>
        <Card sx={{ minWidth: 300, flex: '1', bgcolor: 'background.paper' }}>
          <CardMedia
            component="img"
            image={state.olderAdult.image}
            alt={state.olderAdult.name}
            sx={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '400px' }}
          />
          <CardContent>
            <Typography variant="h3">{state.olderAdult.name}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {state.olderAdult.bio}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Interests: {state.olderAdult.interests.join(", ")}
            </Typography>
            <Typography variant="body2">
              Availability: {state.olderAdult.availableTimes}
            </Typography>
          </CardContent>
        </Card>
        <ProfileEditor />
      </Box>
    </Container>
  );
}

export default ProfilePage;
