import { baseApi } from '@/app/api/baseApi.ts'
import type { moviesApiResponse } from './moviesApi.types.ts'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
    // удалим типизацию так как у нас уже есть responseSchema и перенесем аргументы
    getPopularMovies: build.query<moviesApiResponse, void>({
      query: () => {
        // query: (params: FetchPlaylistsArgs) => {
        // query: (params: FetchPlaylistsArgs) => {
        return {
          url: '/movie/popular',
        }
      },
    }),
    getTopRatedMovies: build.query<moviesApiResponse, void>({
      query: () => {
        // query: (params: FetchPlaylistsArgs) => {
        // query: (params: FetchPlaylistsArgs) => {
        return {
          url: '/movie/top_rated',
        }
      },
    }),
    // { params?: { backdrop_path?: string }}
  }),
})

export const { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery } = moviesApi
