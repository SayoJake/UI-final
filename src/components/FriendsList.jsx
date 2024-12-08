import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Snackbar, Alert } from '@mui/material';
import { AppContext } from '../context/AppContext';
import CallModal from './CallModal';

function FriendsList() {
  const { state } = useContext(AppContext);
  const [callModalOpen, setCallModalOpen] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const [feedback, setFeedback] = useState("");

  const handleCall = (friend) => {
    setSelectedFriend(friend);
    setCallModalOpen(true);
  };

  const handleCallComplete = (msg) => {
    setFeedback(msg);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>My Friends</Typography>
      {state.friends.length === 0 ? (
        <Typography variant="body1">You have no friends added yet.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: '1rem',
            mt: 1
          }}
        >
          {state.friends.map(friend => (
            <Card key={friend.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={friend.image}
                alt={`${friend.name}'s profile`}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ pb:1 }}>
                <Typography variant="h3">{friend.name}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Interests: {friend.interests.join(", ")}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Availability: {friend.availableTimes}
                </Typography>
              </CardContent>
              <CardActions sx={{ pt:0 }}>
                <Button variant="contained" size="small" onClick={() => handleCall(friend)}>
                  Call
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
      <CallModal 
        open={callModalOpen} 
        onClose={() => setCallModalOpen(false)} 
        friend={selectedFriend} 
        onCallComplete={handleCallComplete}
      />

      <Snackbar open={!!feedback} autoHideDuration={3000} onClose={() => setFeedback("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="success" variant="filled">
          {feedback}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FriendsList;
