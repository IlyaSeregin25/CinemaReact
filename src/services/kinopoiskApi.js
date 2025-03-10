import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line no-unused-vars
const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY; //подключил напрямую
console.log();
const excludeGenres = ['', 'новости', 'для взрослых'];
export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    //headers: { 'X-API-KEY': '3ed571b2-d214-4da4-a041-000dbce72ba2', 'Content-Type': 'application/json' },
    prepareHeaders: headers => {
      //headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('X-API-KEY', '3ed571b2-d214-4da4-a041-000dbce72ba2');
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({
    getFilmsTop: builder.query({
      //query: (object) => `/v2.2/films/collections/${name}`,
      query: ({ type, page }) => `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query({
      query: ({ countries, genreId, order = 'NUM_VOTE', type = 'FILM', year, page, keyword = '' }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
    }),
    getGenresAndCountries: builder.query({
      query: () => `/v2.2/films/filters`,
      transformResponse: response => ({
        ...response,
        genres: response.genres.filter(({ genre }) => !excludeGenres.includes(genre)),
      }),
    }),
    getFilm: builder.query({
      query: ({ id }) => `/v2.2/films/${id}`,
    }),
    getSequelsAndPrequels: builder.query({
      query: ({ id }) => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: response => {
        console.log();
        return response.map(el => ({ ...el, kinopoiskId: el.filmId }));
      },
    }),
    getStaf: builder.query({
      query: ({ id }) => `/v1/staff?filmId=${id}`,
    }),
    getStafById: builder.query({
      query: ({ id }) => `/v1/staff/${id}`,
    }),
  }),
});
export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStafQuery,
  useGetStafByIdQuery,
} = kinopoiskApi;
