import { baseApi } from '@/app/api/baseApi.ts'
import type { ApiResponse } from '@/features/movies/api/popularMoviesApi.types.ts'

export const popularMoviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
    // удалим типизацию так как у нас уже есть responseSchema и перенесем аргументы
    fetchPopularMovies: build.query<ApiResponse, void>({
      query: () => {
        // query: (params: FetchPlaylistsArgs) => {
        // query: (params: FetchPlaylistsArgs) => {
        return {
          url: '/movie/popular?language=en-US&page=1',
          // params,
        }
      },
    }),
  }),
})

export const { useFetchPopularMoviesQuery } = popularMoviesApi
