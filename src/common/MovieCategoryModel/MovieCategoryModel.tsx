import s from './movieCategoryModel.module.css'
import { type modifiedMovieType, MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { useEffect, useState } from 'react'

const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

type Props = {
  options?: OptionsType
  movies: MovieDomainType[] | undefined
  isLoading?: boolean
}

export const MovieCategoryModel = ({ options, movies, isLoading }: Props) => {
  const [favoriteMoviesListFromLS, setFavoriteMoviesListFromLS] = useState<modifiedMovieType[] | undefined>([])

  useEffect(() => {
    setFavoriteMoviesListFromLS(options?.isFavorite ? movies : [])
  }, [movies])

  const full = options?.full ?? false
  const style = options?.style ?? undefined

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
        options={options}
        setFavoriteMoviesListFromLS={setFavoriteMoviesListFromLS}
      />
    )
  })

  return <>{isLoading ? skeletonWrapped : <div className={s.moviesCategory}>{mappedMovies}</div>}</>
}
