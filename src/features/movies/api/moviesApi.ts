import { baseApi } from '@/app/api/baseApi.ts'
import type { moviesApiResponse } from './moviesApi.types.ts'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
    // удалим типизацию так как у нас уже есть responseSchema и перенесем аргументы
    fetchPopularMovies: build.query<moviesApiResponse, { params?: { page?: number } }>({
      query: (params) => {
        // query: (params: FetchPlaylistsArgs) => {
        // query: (params: FetchPlaylistsArgs) => {
        return {
          url: '/movie/popular',
          params,
        }
      },
    }),
    // { params?: { backdrop_path?: string }}
  }),
})

export const { useFetchPopularMoviesQuery } = moviesApi
