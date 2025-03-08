import React from 'react';
import { Pagination, Stack } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
console.log();
function MoviesList({ movies, totalPages, page, setPage }) {
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {movies.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems="center">
        <Pagination count={totalPages} page={page} color="primary" onChange={(ev, value) => setPage(value)} />
      </Stack>
    </>
  );
}

export default MoviesList;
