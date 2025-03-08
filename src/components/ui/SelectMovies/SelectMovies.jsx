import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { selectQuery, resetQuery } from '../../../features/currentQuerySlice';
function SelectMovies({ countriesList, genreList, countries, genreId, order, year }) {
  const dispatch = useDispatch();
  const orderList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По оценкам', value: 'NUM_VOTE' },
  ];
  const yearList = new Array(60)
    .fill(null)
    .map((item, ind) => ({ title: new Date().getFullYear() - ind, value: new Date().getFullYear() - ind }));

  console.log();
  return (
    <Stack flexDirection={{ sm: 'colomn', md: 'row' }} gap={1} mt={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel>Сортировка</InputLabel>
        <Select label="Order" value={order} onChange={e => dispatch(selectQuery({ order: e.target.value }))}>
          {orderList.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Страна</InputLabel>
        <Select label="Contries" value={countries} onChange={e => dispatch(selectQuery({ countries: e.target.value }))}>
          {countriesList.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Жанр</InputLabel>
        <Select label="Genres" value={genreId} onChange={e => dispatch(selectQuery({ genreId: e.target.value }))}>
          {genreList.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="Years">Год</InputLabel>
        <Select label="Years" value={year} onChange={e => dispatch(selectQuery({ year: e.target.value }))}>
          {yearList.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => dispatch(resetQuery())}>
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}

export default SelectMovies;
