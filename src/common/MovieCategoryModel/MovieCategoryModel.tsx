import s from './movieCategoryModel.module.css'
import { type modifiedMovieType, MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import type { MovieDomainType, SimilarMovieWithFavoriteType } from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { useEffect, useState } from 'react'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'
import type { ApiConfigurationResponse } from '@/app/model/configurationApi.types.ts'

const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

type Props = {
  options?: OptionsType
  movies: MovieDomainType[] | SimilarMovieWithFavoriteType[] | undefined
  isLoading?: boolean
}
//
// <modifiedMovieType[] | SimilarMovieWithFavoriteType[] | undefined
// >
export const MovieCategoryModel = ({ options, movies, isLoading }: Props) => {
  const [favoriteMoviesListFromLS, setFavoriteMoviesListFromLS] = useState<
    modifiedMovieType[] | SimilarMovieWithFavoriteType[] | MovieDomainType[] | undefined
  >([])
  const { data } = useGetConfigurationQuery(undefined, { skip: !movies || movies.length === 0 })
  useEffect(() => {
    setFavoriteMoviesListFromLS(options?.isFavorite ? movies : [])
  }, [movies])

  const configuration: ApiConfigurationResponse = data
  const full = options?.full ?? false
  const style = options?.style ?? undefined
  const skeleton = options?.skeleton ?? undefined

  const formatedSizeMovieList = full ? movies : movies?.slice(0, BRIEF_MOVIES_SIZE_ON_PAGE)

  const skeletonWrapped = (
    <Box>
      {Array(full ? FULL_MOVIES_SIZE_ON_PAGE : BRIEF_MOVIES_SIZE_ON_PAGE)
        .fill(null)
        .map((_, id) => (
          <div key={id}>
            <Skeleton
              count={1}
              width={style?.width ? style.width : 175}
              height={style?.height ? style.height : 265}
              borderRadius={16}
              style={{ marginBottom: '10px' }}
            />
            <Skeleton count={1} width={110} height={24} borderRadius={6} />
          </div>
        ))}
    </Box>
  )
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

  return <>{isLoading && skeleton ? skeletonWrapped : <div className={s.moviesCategory}>{mappedMovies}</div>}</>
}
