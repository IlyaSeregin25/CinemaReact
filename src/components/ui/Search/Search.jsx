import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useNavigate } from 'react-router-dom';
const movieTypes = {
  FILM: 'Фильм',
  TV_SERIES: 'Сериал',
  MINI_SERIES: 'Сериал',
};
function Search() {
  const navigate = useNavigate();
  const { countries, genreId, order, type, year, page, keyword } = useSelector(state => state.searchQuerySlice);
  const responseFilms = useGetFilmsQuery({ countries, genreId, order, type, year, page, keyword });
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [input]);

  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      sx={{
        width: {
          xs: '100%',
          sm: 300,
        },
        backgroundColor: 'rgba(255,255,255,0.15)',
        '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
        order: {
          xs: 1,
          sm: 0,
        },
      }}
      onInputChange={(ev, value) => setInput(value)}
      options={responseFilms.data ? responseFilms.data.items : []}
      getOptionLabel={option => `${option.nameRu} - ${movieTypes[option.type]} - ${option.year}`} //Что бы работал при клике
      onChange={(ev, value) => {
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {responseFilms.isFetching ? <CircularProgress size={20} color="inherit" /> : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default Search;
