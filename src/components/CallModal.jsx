// src/components/CallModal.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, Typography } from '@mui/material';
import { AppContext } from '../context/AppContext';

function CallModal({ open, onClose, friend, onCallComplete }) {
  const { dispatch } = useContext(AppContext);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) {
      setNotes("");
    }
  }, [open]);

  const handleCall = () => {
    if (friend) {
      dispatch({
        type: 'ADD_CALL',
        payload: {
          friendId: friend.id,
          friendName: friend.name,
          date: new Date().toLocaleString(),
          notes
        }
      });
      onCallComplete(`Call with ${friend.name} recorded in history.`);
    }
    onClose();
  };

  return (
    <Dialog open={open && !!friend} onClose={onClose}>
      <DialogTitle>Start a Call with {friend?.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Leave any pre-call notes or topics you’d like to discuss:
        </Typography>
        <TextField
          multiline
          fullWidth
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          label="Call Notes"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); }}>Cancel</Button>
        <Button variant="contained" onClick={handleCall}>Start Call</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CallModal;
