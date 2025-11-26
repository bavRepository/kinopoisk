import { getFavoriteMoviesFromLs } from '@/common/localStorage/localStorage.ts'
import type { BaseMoviesResponse, FetchMoviesArgs, MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import type { moviesApiUpdateQueryDataType } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { MoviesCategories } from '@/common/constants'

export const updateRequestCache = (
  data: BaseMoviesResponse | undefined,
  changeFavoriteCacheData: moviesApiUpdateQueryDataType,
  categoryMovieItem: MoviesCategories,
  params: FetchMoviesArgs = { page: 1 },
) => {
  const favoriteMovieFromLS = getFavoriteMoviesFromLs()
  const movieList = data?.results || []
  // change every movie its field Favorite value in rtk query cache
  movieList?.forEach((movie: MovieDomainType) => {
    const index = favoriteMovieFromLS.findIndex((lsMovie) => lsMovie.id === movie.id)
    if (index !== -1) {
      changeFavoriteCacheData(movie.id, true, categoryMovieItem, params)
    }
  })
}
