import React, { useContext } from 'react';
import { Box, Button, Typography, Stepper, Step, StepLabel, Dialog, DialogContent, DialogActions } from '@mui/material';
import { AppContext } from '../context/AppContext';

function MatchWizard({ open, onClose }) {
  // Simple wizard: 3 steps
  // Step 1: Show user's interests
  // Step 2: Show volunteers and find best match
  // Step 3: Display chosen match
  const steps = ["Review Your Interests", "Finding Best Match", "Match Result"];
  const [activeStep, setActiveStep] = React.useState(0);
  const { state } = useContext(AppContext);

  const userInterests = state.olderAdult.interests;
  
  const bestMatch = React.useMemo(() => {
    let best = null;
    let bestScore = -1;
    state.volunteers.forEach(v => {
      const overlap = v.interests.filter(i => userInterests.includes(i)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        best = v;
      }
    });
    return best;
  }, [state.volunteers, userInterests]);

  const handleNext = () => {
    if (activeStep < steps.length -1) {
      setActiveStep(activeStep+1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep-1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{mb:2}}>Match Wizard</Typography>
        <Stepper activeStep={activeStep} sx={{mb:3}}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <DialogContent>
          {activeStep === 0 && (
            <Box>
              <Typography variant="body1">Your Interests:</Typography>
              <Typography variant="body2">{userInterests.join(", ")}</Typography>
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <Typography variant="body1">Finding the best match among {state.volunteers.length} volunteers...</Typography>
              <Typography variant="body2">Just a moment...</Typography>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              {bestMatch ? (
                <>
                  <Typography variant="body1">We found a great match:</Typography>
                  <Typography variant="h3">{bestMatch.name}</Typography>
                  <Typography variant="body2">Interests: {bestMatch.interests.join(", ")}</Typography>
                </>
              ) : (
                <Typography variant="body1">No suitable match found at this time.</Typography>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          {activeStep > 0 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          <Button variant="contained" onClick={handleNext}>
            {activeStep < steps.length-1 ? "Next" : "Finish"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default MatchWizard;
