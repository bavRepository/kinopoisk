import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer, appSlice } from './app-slice.ts'
import { baseApi } from '@/app/api/baseApi.ts'
import { favoriteMoviesReducer, favoriteMoviesSlice } from '@/features/movies/model/favoriteMovies-slice.ts'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [favoriteMoviesSlice.name]: favoriteMoviesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch) // Чтобы использовать такие методы рефетчинг он фокус рефетчинг он реконнект
// @ts-ignore
window.store = store
