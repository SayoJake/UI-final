import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { AppContext } from '../context/AppContext';

function ProfileEditor() {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState(state.olderAdult.name);
  const [image, setImage] = useState(state.olderAdult.image);
  const [interests, setInterests] = useState(state.olderAdult.interests.join(', '));
  const [availableTimes, setAvailableTimes] = useState(state.olderAdult.availableTimes);
  const [bio, setBio] = useState(state.olderAdult.bio);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_OLDER_ADULT',
      payload: {
        name,
        image,
        interests: interests.split(',').map(i => i.trim()).filter(i=>i),
        availableTimes,
        bio
      }
    });
    setFeedback("Profile updated successfully!");
  };

  return (
    <Box sx={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h2">Edit Your Profile</Typography>
      <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Profile Image URL" fullWidth value={image} onChange={(e) => setImage(e.target.value)} />
      <TextField label="Interests (comma separated)" fullWidth value={interests} onChange={(e) => setInterests(e.target.value)} />
      <TextField label="Availability" fullWidth value={availableTimes} onChange={(e) => setAvailableTimes(e.target.value)} />
      <TextField label="Bio" fullWidth multiline rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>

      <Snackbar open={!!feedback} autoHideDuration={3000} onClose={() => setFeedback("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="success" variant="filled">{feedback}</Alert>
      </Snackbar>
    </Box>
  );
}

export default ProfileEditor;
