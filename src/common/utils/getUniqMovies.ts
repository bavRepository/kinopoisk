import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'

export const getUniqMovies = (responseResultMovies: MovieDomainType[] | undefined) => {
  const favoriteMovieIdFromLS: number[] = restoreState([], localStorageFavoriteKey)
  const filteredResults = responseResultMovies?.filter((movie: MovieDomainType) =>
    favoriteMovieIdFromLS.includes(movie.id),
  )

  return Array.from(new Map(filteredResults?.map((item) => [item.id, item])).values())
}
