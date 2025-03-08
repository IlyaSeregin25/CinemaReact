import React from 'react';
import { Skeleton, Stack, useMediaQuery } from '@mui/material';

function MoviesListSceleton() {
  //const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Skeleton sx={{ mt: 2, mb: 2 }} variant="rectangular" width={200} height="32px" animation="wave" />
      <Stack flexDirection="row" justifyContent="center" flexWrap="wrap">
        {new Array(15).fill(null).map((el, ind) => (
          <React.Fragment key={ind}>
            <Stack flexDirection="column" display="flex">
              <Skeleton variant="rectangular" width={215} height={322} animation="wave" />
              <Skeleton variant="text" animation="wave" width={120} />
              <Skeleton variant="text" animation="wave" width={120} />
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
}

export default MoviesListSceleton;
