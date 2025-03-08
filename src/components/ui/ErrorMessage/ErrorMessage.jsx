import { Box, Typography } from '@mui/material';
import React from 'react';

function ErrorMessage() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h6">Произошла ошибка</Typography>
    </Box>
  );
}

export default ErrorMessage;
