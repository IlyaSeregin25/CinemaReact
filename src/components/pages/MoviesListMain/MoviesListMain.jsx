import React, { useEffect, useState } from 'react';
import { useGetFilmsQuery, useGetGenresAndCountriesQuery } from '../../../services/kinopoiskApi';
import { MOVIE_LISTS } from '../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import MoviesList from '../../ui/MoviesList';
import { ArrowBack } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesListMainSceleton from './MoviesListMainSceleton';
import SelectMovies from '../../ui/SelectMovies/SelectMovies';
console.log();
function MoviesListMain() {
  console.log();
  const { countries, genreId, order, year } = useSelector(state => state.currentQuerySlice);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;
  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    page,
    countries,
    genreId: myGenreId,
    order,
    year,
  });
  useEffect(() => {
    setPage(1);
  }, [location]);

  const responseGenresAndCountries = useGetGenresAndCountriesQuery();
  console.log();

  if (responseFilms.error || responseGenresAndCountries.error) return <ErrorMessage />;
  if (responseFilms.isLoading || responseGenresAndCountries.isLoading) return <MoviesListMainSceleton />;
  //data.items[0] : {kinopoiskId, posterUrlPreview}

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genreList={responseGenresAndCountries.data.genres}
        countries={countries}
        genreId={genreId}
        order={order}
        year={year}
      />
      {
        <MoviesList
          movies={responseFilms.data.items}
          totalPages={responseFilms.data.totalPages}
          page={page}
          setPage={setPage}
        />
      }
    </>
  );
}

export default MoviesListMain;
