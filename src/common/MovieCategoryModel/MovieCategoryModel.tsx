import s from './movieCategoryModel.module.css'
import { type ModifiedMovieType, MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/Skeleton/Box.tsx'
import type { MovieDomainType, SimilarMovieWithFavoriteType } from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { useEffect, useState } from 'react'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'
import type { ApiConfigurationResponse } from '@/app/model/configurationApi.types.ts'
import { SkeletonMovie } from '@/common/components/Skeleton/SkeletonMovie.tsx'

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
  const { data } = useGetConfigurationQuery(undefined, { skip: !movies || movies.length === 0 })
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

  return (
    <>
      {isLoading ? (
        <SkeletonMovie options={{ skeletonSize: movies?.length }} />
      ) : (
        <div className={s.moviesCategory}>{mappedMovies}</div>
      )}
    </>
  )
}
