import { createSlice } from '@reduxjs/toolkit'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'

export const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState: {
    favoriteMovies: [] as MovieDomainType[],
  },
  selectors: {
    selectFavoriteMovies: (state) => state.favoriteMovies,
  },
  reducers: (create) => ({
    setFavoriteMovies: create.reducer<{ movies: MovieDomainType[] }>((state, action) => {
      state.favoriteMovies = [...state.favoriteMovies, ...action.payload.movies]
    }),
  }),
})

export const { selectFavoriteMovies } = favoriteMoviesSlice.selectors
export const { setFavoriteMovies } = favoriteMoviesSlice.actions
export const favoriteMoviesReducer = favoriteMoviesSlice.reducer
