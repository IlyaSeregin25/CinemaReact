import React from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useGetStafByIdQuery } from '../../../services/kinopoiskApi';
import { Box, Button, CircularProgress, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
console.log();
///`actor/:id`
function ActorDetail() {
  const isDesctop = useMediaQuery('(min-width:900px)');

  const navigate = useNavigate();
  const { id } = useParams();
  const responsePesonDetail = useGetStafByIdQuery({ id });
  if (responsePesonDetail.isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }
  if (responsePesonDetail.error) {
    return <ErrorMessage />;
  }
  console.log();
  return responsePesonDetail.data ? (
    <Box mt={1}>
      <Stack
        display="flex"
        flexDirection={isDesctop ? 'row' : 'column'}
        gap={1}
        alignItems={isDesctop ? 'start' : 'center'}
      >
        <img
          src={responsePesonDetail.data.posterUrl}
          style={{
            //width: isDesctop ? '220px' : '100%',
            //height: isDesctop ? '350px' : 'calc(100vh - 100px)',
            width: '220px',
            height: '350px',
            objectFit: 'cover',
            flexShrink: 1,
          }}
        />
        <Stack flexGrow={1} ml={1} gap={3}>
          <Stack flexDirection="row">
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
            <Stack gap="5px">
              <Typography variant="h5">{responsePesonDetail.data.nameRu}</Typography>
              <Typography>{responsePesonDetail.data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="h5">Об актере</Typography>
            <Stack mt={2} flexDirection="row" justifyContent="start" flexWrap="wrap">
              <Typography width="50%" minWidth="300px">
                Карьера
              </Typography>
              <Typography>{responsePesonDetail.data.profession}</Typography>
            </Stack>
            <Stack mt={1} flexDirection="row" justifyContent="start" flexWrap="wrap">
              <Typography width="50%" minWidth="300px">
                Рост
              </Typography>
              <Typography>{responsePesonDetail.data.growth}</Typography>
            </Stack>
            <Stack mt={1} flexDirection="row" justifyContent="start" flexWrap="wrap">
              <Typography width="50%" minWidth="300px">
                Дата рождения
              </Typography>
              <Typography>
                {responsePesonDetail.data.birthday} ({responsePesonDetail.data.age} лет)
              </Typography>
            </Stack>
            <Stack mt={1} flexDirection="row" justifyContent="start" flexWrap="wrap">
              <Typography width="50%" minWidth="300px">
                Всего фильмов
              </Typography>
              <Typography>{responsePesonDetail.data.films.length}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="h5">Факты</Typography>
            <Stack gap={1}>
              {responsePesonDetail.data.facts.map(fact => (
                <Typography key={fact}>{fact}</Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Typography mt={2} variant="h5">
        Фильмы
      </Typography>
      <Stack gap={1} mt={1}>
        {responsePesonDetail.data.films.slice(0, 20).map((film, ind) => {
          if (film.filmId && film.nameRu && film.rating) {
            return (
              <Stack key={film.filmId} flexDirection="row" justifyContent="space-between">
                <Typography width="100%" minWidth="20px" maxWidth="10%">
                  {ind + 1}
                </Typography>
                <Link component={RouterLink} to={`/movie/${film.filmId}`} flexGrow={1} px={1} textAlign="start">
                  {film.nameRu}
                </Link>
                <Typography width="100%" minWidth="20px" maxWidth="10%" textAlign="end">
                  {film.rating}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Box>
  ) : (
    <Stack>
      <Typography>Данные об человеке не найдены</Typography>
    </Stack>
  );
}

export default ActorDetail;
