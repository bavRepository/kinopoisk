import type { modifiedMovieType } from '@/common/components/MovieItem/MovieItem.tsx'
import { isMovieWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import type {
  CastMemberWithFavorite,
  MovieDomainType,
  SimilarMovieWithFavoriteType,
} from '@/features/movies/api/moviesApi.types.ts'

export const getModifiedMovieForLS = (
  movie: MovieDomainType | modifiedMovieType | SimilarMovieWithFavoriteType | CastMemberWithFavorite,
): modifiedMovieType => {
  return {
    id: movie?.id,
    title: isMovieWithProperty(movie, 'title') ? (movie as any).title : '',
    poster_path: isMovieWithProperty(movie, 'poster_path') ? (movie as any).poster_path : '',
    vote_average: isMovieWithProperty(movie, 'vote_average') ? (movie as any).vote_average : '',
  }
}
