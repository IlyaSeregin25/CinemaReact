import { Stack, Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: 'row' },
        justifyContent: { sm: 'space-between' },
        alignItems: { sm: 'center' },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} &laquo;betflix&raquo; 18+ <br />
        Данный сайт создан исключительно в обучающих целях
        <br />
        все права принадлежат правообладателям
      </Typography>
      <Typography variant="h4" color="primary.main">
        betflix
      </Typography>
    </Stack>
  );
}

export default Footer;
