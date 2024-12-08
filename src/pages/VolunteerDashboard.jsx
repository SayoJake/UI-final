import React, { useState } from 'react';
import { 
  Box, Typography, Button, Card, CardContent, CardActions, 
  TextField, Divider, Snackbar, Alert, Chip, Tabs, Tab, Container
} from '@mui/material';

const sampleRequests = [
  { id: 1, name: "Alice Johnson", topic: "Old Musicals" },
  { id: 2, name: "Joe Smith", topic: "Family Stories" },
  { id: 3, name: "Maria Lopez", topic: "Gardening" },
];

const VolunteerDashboard = () => {
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState(sampleRequests);
  const [acceptedRequestId, setAcceptedRequestId] = useState(null);

  const [interests, setInterests] = useState("Gardening, Old Movies");
  const [availabilityMsg, setAvailabilityMsg] = useState("Mon-Fri 9am-12pm");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [viewMode, setViewMode] = useState(0);

  const [contacts, setContacts] = useState([]);

  const handleAccept = (id) => {
    setAcceptedRequestId(id);
    setTimeout(() => {
      const req = requests.find(r => r.id === id);
      if (req) {
        setContacts(prev => [...prev, { ...req, favorite: false }]);
      }
      setRequests(prev => prev.filter(r => r.id !== id));
      setAcceptedRequestId(null);
    }, 3000);
  };

  const handleUpdateProfile = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>Volunteer Dashboard</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label={available ? "Available" : "Busy"}
          color={available ? "success" : "warning"}
        />
        <Button variant="outlined" onClick={() => setAvailable(!available)}>
          {available ? 'Set to Busy' : 'Set to Available'}
        </Button>
      </Box>

      <Typography variant="h2" sx={{ mb: 2 }}>Your Profile (Volunteer Demo)</Typography>
      <Box sx={{ maxWidth: '400px', mb: 2 }}>
        <TextField
          label="Your Interests"
          fullWidth
          multiline
          rows={2}
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Your Availability"
          fullWidth
          value={availabilityMsg}
          onChange={(e) => setAvailabilityMsg(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Tabs value={viewMode} onChange={(e, v) => setViewMode(v)} sx={{ mb: 2 }}>
        <Tab label="Incoming Requests" />
        <Tab label="My Contacts" />
      </Tabs>

      {viewMode === 0 && (
        <Box>
          {requests.length === 0 ? (
            <Typography variant="body1">No incoming requests at the moment.</Typography>
          ) : (
            requests.map(req => (
              <Card key={req.id} sx={{ mb: 1 }}>
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h3">{req.name}</Typography>
                  <Typography variant="body2">
                    Wants to talk about: <strong>{req.topic}</strong>
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                  {acceptedRequestId === req.id ? (
                    <Typography variant="body2" sx={{ color: 'green', ml: 1 }}>
                      Connecting...
                    </Typography>
                  ) : (
                    <Button variant="contained" onClick={() => handleAccept(req.id)}>
                      Accept Request
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      )}

      {viewMode === 1 && (
        <Box>
          {contacts.length === 0 ? (
            <Typography variant="body1">No contacts yet.</Typography>
          ) : (
            contacts.map(con => (
              <Card key={con.id} sx={{ mb: 1 }}>
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h3">{con.name}</Typography>
                  <Typography variant="body2">
                    Topic: {con.topic}
                  </Typography>
                </CardContent>
                <CardActions sx={{ pt: 0 }}>
                  <Button variant="contained" size="small">Call Again</Button>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      )}

      <Snackbar open={updateSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VolunteerDashboard;
