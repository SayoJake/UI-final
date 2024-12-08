import React, { useContext } from 'react';
import { Box, Typography, Divider, Container } from '@mui/material';
import { AppContext } from '../context/AppContext';
import FriendsList from '../components/FriendsList';

function FriendsPage() {
  const { state } = useContext(AppContext);

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <FriendsList />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h2">Call History</Typography>
      {state.calls.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 1 }}>No calls yet.</Typography>
      ) : (
        <Box sx={{ mt: 1 }}>
          {state.calls.map((c, i) => (
            <Box key={i} sx={{ mb: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: '4px' }}>
              <Typography variant="body1">
                <strong>{c.friendName}</strong> called on {c.date}
              </Typography>
              <Typography variant="body2">
                Notes: {c.notes}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default FriendsPage;
