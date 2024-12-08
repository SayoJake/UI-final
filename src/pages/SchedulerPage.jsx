import React from 'react';
import { Typography, Container } from '@mui/material';
import AvailabilityScheduler from '../components/AvailabilityScheduler';

function SchedulerPage() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>Scheduler</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Set your availability times below.
      </Typography>
      <AvailabilityScheduler />
    </Container>
  );
}

export default SchedulerPage;
