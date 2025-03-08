import React from 'react';
import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
console.log();
function MoviesSceleton() {
  const isMobile = useMediaQuery('(max-width:600px)');
  console.log();
  return (
    <Box mt={2} mb={2}>
      {new Array(5).fill(null).map((el, ind) => (
        <React.Fragment key={ind}>
          <Skeleton variant="rectangular" width={200} height="32px" animation="wave" />
          <Stack flexDirection="row" display="flex" justifyContent="center" flexWrap="wrap">
            {new Array(5).fill(null).map((el, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={isMobile ? '100%' : '230px'}
                height={isMobile ? '520px' : '352px'}
                animation="wave"
              />
            ))}
          </Stack>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default MoviesSceleton;
