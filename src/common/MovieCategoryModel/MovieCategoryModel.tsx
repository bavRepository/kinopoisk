import s from './movieCategoryModel.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import 'react-loading-skeleton/dist/skeleton.css'
import type {
  ApiConfigurationResponse,
  ModifiedMovieType,
  MovieDomainType,
  SimilarMovieWithFavoriteType,
} from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { useEffect, useState } from 'react'
import { SkeletonMovie } from '@/common/components/Skeleton/SkeletonMovie.tsx'
import { useGetMovieConfigurationQuery } from '@/features/movies/api/moviesApi.ts'

type Props = {
  options?: OptionsType
  movies: MovieDomainType[] | SimilarMovieWithFavoriteType[] | ModifiedMovieType[] | undefined
  isLoading?: boolean
}
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

export const MovieCategoryModel = ({ options, movies, isLoading }: Props) => {
  const [favoriteMoviesListFromLS, setFavoriteMoviesListFromLS] = useState<
    ModifiedMovieType[] | SimilarMovieWithFavoriteType[] | MovieDomainType[] | undefined
  >([])
  const { data } = useGetMovieConfigurationQuery(undefined, { skip: !movies || movies.length === 0 })
  useEffect(() => {
    setFavoriteMoviesListFromLS(options?.isFavorite ? movies : [])
  }, [movies])

  const configuration: ApiConfigurationResponse = data
  const full = options?.full ?? false
  const style = options?.style ?? undefined

  const formatedSizeMovieList = full ? movies : movies?.slice(0, BRIEF_MOVIES_SIZE_ON_PAGE)

  const mappedMovies = (options?.isFavorite ? favoriteMoviesListFromLS : formatedSizeMovieList)?.map((movie) => {
    return (
      <MovieItem
        key={movie.id}
        movie={movie}
        style={style}
        options={{ ...options, configuration }}
        setFavoriteMoviesListFromLS={setFavoriteMoviesListFromLS}
      />
    )
  })

  return <>{isLoading ? <SkeletonMovie options={options} /> : <div className={s.moviesCategory}>{mappedMovies}</div>}</>
}
