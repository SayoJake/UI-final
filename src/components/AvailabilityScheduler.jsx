import React, { useContext, useState } from 'react';
import { Box, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import { AppContext } from '../context/AppContext';

function AvailabilityScheduler() {
  const { state, dispatch } = useContext(AppContext);
  const [availability, setAvailability] = useState(state.olderAdult.availableTimes);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    dispatch({
      type: 'UPDATE_OLDER_ADULT',
      payload: {
        availableTimes: availability
      }
    });
    setFeedback("Availability updated successfully!");
  };

  return (
    <Box sx={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h2">Set Your Availability</Typography>
      <Typography variant="body1">Format: "Mon-Fri 10am-4pm" or similar.</Typography>
      <TextField
        label="Availability"
        fullWidth
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>Save Availability</Button>

      <Snackbar open={!!feedback} autoHideDuration={3000} onClose={() => setFeedback("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="success" variant="filled">{feedback}</Alert>
      </Snackbar>
    </Box>
  );
}

export default AvailabilityScheduler;
