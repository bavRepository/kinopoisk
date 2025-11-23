import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi.ts'
import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'

export const useCategoryResponseData = (category: MoviesCategories) => {
  const popularResponse = useGetPopularMoviesQuery()
  const topRatedResponse = useGetTopRatedMoviesQuery()
  const nowPlayingResponse = useGetNowPlayingMoviesQuery()
  const upcomingResponse = useGetUpcomingMoviesQuery()

  let response
  switch (category) {
    case `${MOVIES_CATEGORIES.NowPlayingMovies}`:
      response = nowPlayingResponse
      break
    case `${MOVIES_CATEGORIES.TopRatedMovies}`:
      response = topRatedResponse
      break
    case `${MOVIES_CATEGORIES.PopularMovies}`:
      response = popularResponse
      break
    case `${MOVIES_CATEGORIES.UpcomingMovies}`:
      response = upcomingResponse
      break
    default:
      response = popularResponse
  }
  return response
}
