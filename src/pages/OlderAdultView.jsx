// src/pages/OlderAdultView.jsx
import React, { useContext, useState } from 'react';
import { 
  Box, Typography, Card, CardMedia, CardContent, CardActions, 
  Button, Snackbar, Alert, TextField, IconButton, InputAdornment, Container
} from '@mui/material';
import { Favorite, FavoriteBorder, Search, Call } from '@mui/icons-material';
import { AppContext } from '../context/AppContext';
import MatchWizard from '../components/MatchWizard';
import CallModal from '../components/CallModal';

const OlderAdultView = () => {
  const { state, dispatch } = useContext(AppContext);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterInterest, setFilterInterest] = useState("");

  const [friendFeedback, setFriendFeedback] = useState("");
  
  // For calling a volunteer
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedVolunteerForCall, setSelectedVolunteerForCall] = useState(null);
  const [callFeedback, setCallFeedback] = useState("");

  const handleCallRequest = (volunteer) => {
    setSelectedVolunteerForCall(volunteer);
    setCallModalOpen(true);
  };

  const handleCallComplete = (msg) => {
    setCallFeedback(msg);
  };

  const toggleFriend = (vol) => {
    if (state.friends.some(f => f.id === vol.id)) {
      dispatch({ type: 'REMOVE_FRIEND', payload: vol });
      setFriendFeedback(`${vol.name} removed from friends`);
    } else {
      dispatch({ type: 'ADD_FRIEND', payload: vol });
      setFriendFeedback(`${vol.name} added to friends`);
    }
  };

  const filteredVolunteers = state.volunteers.filter(v => {
    const matchName = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const interestSearch = filterInterest.toLowerCase();
    const matchInterest = interestSearch === "" 
      ? true 
      : v.interests.some(i => i.toLowerCase().includes(interestSearch));
    return matchName && matchInterest;
  });

  return (
    <Container maxWidth="md" sx={{ py: 2, bgcolor: 'transparent' }}>
      <Typography variant="h1">Older Adult View</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Browse volunteers who share your interests. Add them as friends or call them directly.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" startIcon={<Search />} onClick={() => setWizardOpen(true)}>
          Find Best Match (Wizard)
        </Button>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
          }}
          size="small"
        />
        <TextField
          label="Filter by interest"
          variant="outlined"
          placeholder="e.g., 'garden' for 'Gardening'"
          value={filterInterest}
          onChange={(e) => setFilterInterest(e.target.value)}
          size="small"
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: '1rem'
        }}
      >
        {filteredVolunteers.map(vol => {
          const isFriend = state.friends.some(f => f.id === vol.id);
          return (
            <Card key={vol.id} sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
              <CardMedia
                component="img"
                image={vol.image}
                alt={`${vol.name}'s profile`}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ pb:1 }}>
                <Typography variant="h3">{vol.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Interests: {vol.interests.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Availability: {vol.availableTimes}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', pt:0 }}>
                <Box sx={{ display:'flex', gap:1 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<Call />} 
                    size="small"
                    onClick={() => handleCallRequest(vol)}
                  >
                    Call
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => toggleFriend(vol)}
                    size="small"
                  >
                    {isFriend ? "Remove Friend" : "Add Friend"}
                  </Button>
                </Box>
                <IconButton onClick={() => toggleFriend(vol)}>
                  {isFriend ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Box>

      {/* Snackbars */}
      <Snackbar open={!!friendFeedback} autoHideDuration={3000} onClose={() => setFriendFeedback("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="info" variant="filled">
          {friendFeedback}
        </Alert>
      </Snackbar>

      <Snackbar open={!!callFeedback} autoHideDuration={3000} onClose={() => setCallFeedback("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled">
          {callFeedback}
        </Alert>
      </Snackbar>

      {/* Modals */}
      <MatchWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <CallModal 
        open={callModalOpen} 
        onClose={() => setCallModalOpen(false)} 
        friend={selectedVolunteerForCall} 
        onCallComplete={handleCallComplete}
      />
    </Container>
  );
};

export default OlderAdultView;
