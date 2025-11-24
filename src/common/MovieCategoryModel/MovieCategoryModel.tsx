import s from './movieCategoryModel.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
//
const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6
//
type Props = {
  options?: OptionsType
  responseMovieApiData: MovieDomainType[] | undefined
  isLoading?: boolean
}

export const MovieCategoryModel = ({ options, responseMovieApiData, isLoading }: Props) => {
  const movieList = responseMovieApiData

  const full = options?.full ?? false
  const style = options?.style ?? undefined

  const formatedSizeMovieList = full ? movieList : movieList?.slice(0, BRIEF_MOVIES_SIZE_ON_PAGE)

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
  const mappedMovies = formatedSizeMovieList?.map((movie) => {
    return <MovieItem key={movie.id} movie={movie} style={style} />
  })

  return (
    <>
      {isLoading ? (
        skeletonWrapped
      ) : options?.favoritesOnly ? (
        mappedMovies
      ) : (
        <div className={s.moviesCategory}>{mappedMovies}</div>
      )}
    </>
  )
}
