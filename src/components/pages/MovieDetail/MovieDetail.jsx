import React from 'react';
import { useGetFilmQuery, useGetSequelsAndPrequelsQuery, useGetStafQuery } from '../../../services/kinopoiskApi';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Button, ButtonGroup, CircularProgress, Grid, Link, Stack, Typography } from '@mui/material';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import { ArrowBack, Language, Movie } from '@mui/icons-material';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer';
console.log();
function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const responseFilm = useGetFilmQuery({ id });
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery({ id });
  const responseStaff = useGetStafQuery({ id });

  const isLoading = responseFilm.isLoading || responseSequelsAndPrequels.isLoading || responseStaff.isLoading;
  const isError = responseFilm.error || responseStaff.error;
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" margin="auto" alignItems="center" gap={1}>
        <CircularProgress /> Loading ...
      </Box>
    );
  if (isError) return <ErrorMessage />;
  console.log();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={1}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img src={responseFilm.data.posterUrl} alt={responseFilm.data.nameRu} width="100%" />
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={2}>
              <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Год</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Страна</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseFilm.data.countries.map(({ country }) => (
                <Typography gutterBottom key={country}>
                  {country}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Жанры</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseFilm.data.genres.map(({ genre }) => (
                <Typography gutterBottom key={genre}>
                  {genre}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Режессеры</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseStaff.data
                .filter(elem => elem.professionKey === 'DIRECTOR')
                .map(person => (
                  <Typography gutterBottom key={person.staffId}>
                    {person.nameRu}
                  </Typography>
                ))}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Время</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{responseFilm.data.filmLength} мин</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Описание</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {responseFilm.data.description ? responseFilm.data.description : 'Описание отсутствует'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">В главных ролях</Typography>
            </Grid>
            <Grid item xs={12}>
              {responseStaff.data
                .filter(elem => elem.professionKey === 'ACTOR')
                .slice(0, 10)
                .map(person => (
                  <Link gutterBottom key={person.staffId} component={RouterLink} to={`/actor/${person.staffId}`}>
                    <Typography>{person.nameRu}</Typography>
                  </Link>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button target="_blank" href={responseFilm.data.webUrl} endIcon={<Language />}>
              Кинопоиск
            </Button>
            <Button target="_blank" href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`} endIcon={<Movie />}>
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {/* VIDEO */}
      <Box>
        <Typography variant="h5">Смотреть онлайн</Typography>
        <VideoPlayer />
      </Box>
      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography gutterBottom variant="h5">
            Сиквелы и приквелы
          </Typography>
          <Stack flexDirection="row" gap={2}>
            {responseSequelsAndPrequels.data.map(film => (
              <MovieCard key={film.filmId} movie={film} reload={true} />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

export default MovieDetail;
