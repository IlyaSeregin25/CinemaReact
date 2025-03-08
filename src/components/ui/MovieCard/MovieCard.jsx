import React from 'react';
import styles from './MovieCard.module.css';
import { Box, Rating, Stack, Tooltip, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function MovieCard({ movie, reload = false }) {
  const linkProps = reload
    ? { component: 'a', href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };

  return (
    <>
      <Stack>
        <Link {...linkProps} className={styles.card} width="215px">
          <img src={movie.posterUrlPreview} alt={movie.nameRu} className={styles.img} />
          <Link component="p" width="90%" textAlign="center" className={styles.parag}>
            {movie.nameRu ? movie.nameRu : movie.nameEn}
          </Link>
        </Link>
        {movie.ratingKinopoisk && (
          <Stack alignItems="center">
            <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
              <Box>
                <Rating name="read-only" value={movie.ratingKinopoisk / 2} readOnly precision={0.1} />
              </Box>
            </Tooltip>
          </Stack>
        )}
      </Stack>
      {/* <Stack>
        <Link {...linkProps} display="flex" flexDirection="column" height="100%">
          <img src={movie.posterUrlPreview} alt={movie.nameRu} className={styles.img} />
          <Link component="p" textAlign="center" sx={{ width: '200px' }}>
            {movie.nameRu ? movie.nameRu : movie.nameEn}
          </Link>
        </Link>
        {movie.ratingKinopoisk && (
          <Stack alignItems="center">
            <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
              <Box>
                <Rating name="read-only" value={movie.ratingKinopoisk / 2} readOnly precision={0.1} />
              </Box>
            </Tooltip>
          </Stack>
        )}
      </Stack> */}
    </>
  );
}

export default MovieCard;
