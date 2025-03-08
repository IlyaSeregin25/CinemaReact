import React from 'react';
import useMoviesQuery from '../../../hooks/useMoviesQuery';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MOVIE_LISTS, TOP_LISTS } from '../../../constants';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesSceleton from './MoviesSceleton';

console.log();
function Movies() {
  const { isLoading, hasError, responsePopular, responseBest, responseFilms, responseSerials, responseCartoons } =
    useMoviesQuery();
  if (isLoading) return <MoviesSceleton />;
  if (hasError) return <ErrorMessage />;
  const serializeDataForCarousel = data => {
    return data.map(row => {
      return (
        <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
          <BearSlideImage imageUrl={row.posterUrlPreview} />;
        </RouterLink>
      );
    });
  };
  const carouselArr = [
    {
      title: TOP_LISTS[0].title,
      url: TOP_LISTS[0].url,
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: TOP_LISTS[1].title,
      url: TOP_LISTS[1].url,
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: MOVIE_LISTS[0].title,
      url: MOVIE_LISTS[0].url,
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: MOVIE_LISTS[1].title,
      url: MOVIE_LISTS[1].url,
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: MOVIE_LISTS[2].title,
      url: MOVIE_LISTS[2].url,
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];
  console.log();
  return (
    <>
      {carouselArr.map(carousel => (
        <Stack key={carousel.url}>
          <Link sx={{ mt: 2, mb: 2 }} variant="h4" component={RouterLink} to={carousel.url}>
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1} //Прокрутка
            isEnableNavButton
            isEnableLoop //бесконечная прокрутка
            //isEnableAutoPlay
            autoPlayTime={5000}
            height="320px"
            breakpoints={{
              375: {},
              768: {
                slidesPerView: 5,
                isEnableAutoPlay: true,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
}

export default Movies;
