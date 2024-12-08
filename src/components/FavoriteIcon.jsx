import React from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const FavoriteIcon = ({ isFavorite, onToggle }) => (
  <IconButton onClick={onToggle}>
    {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
  </IconButton>
);

export default FavoriteIcon;
