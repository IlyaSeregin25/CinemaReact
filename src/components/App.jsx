import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import { MOVIE_LISTS, TOP_LISTS } from '../constants';
import MoviesListTop from './pages/MoviesListTop';
import MoviesListMain from './pages/MoviesListMain';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Родитель с (хедером футором навбаром) и изменяющимися детьми
      children: [
        {
          path: '/',
          element: <Movies />,
        },
        ...TOP_LISTS.map(el => ({
          path: el.url,
          element: <MoviesListTop />, // куча каруселей по жанрам
        })),
        ...MOVIE_LISTS.map(el => ({
          path: el.url,
          element: <MoviesListMain />, // 3 карусели Фильмы Сериалы Мультфильмы
        })),
        {
          path: '/movie/:id',
          element: <MovieDetail />,
        },
        {
          path: '/actor/:id',
          element: <ActorDetail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
