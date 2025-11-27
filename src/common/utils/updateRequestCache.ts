import { getFavoriteMoviesFromLs } from '@/common/localStorage/localStorage.ts'
import type { BaseMoviesResponse, FetchMoviesArgs } from '@/features/movies/api/moviesApi.types.ts'
import type { moviesApiUpdateQueryDataType } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { MoviesCategories } from '@/common/constants'

export const updateRequestCache = <T extends { id: number }>(
  data: BaseMoviesResponse<T[]> | undefined,
  changeFavoriteCacheData: moviesApiUpdateQueryDataType,
  categoryMovieItem: MoviesCategories,
  params: FetchMoviesArgs = { page: 1 },
) => {
  const favoriteMovieFromLS = getFavoriteMoviesFromLs()
  const movieList = data?.results || []

  movieList.forEach((movie) => {
    const index = favoriteMovieFromLS.findIndex((ls) => ls.id === movie.id)
    if (index !== -1) {
      changeFavoriteCacheData(movie.id, true, categoryMovieItem, params)
    }
  })
}
