import s from './movieCategoryModel.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import type { BaseMoviesResponse } from '@/features/movies/api/moviesApi.types.ts'
import type { MoviesCategories } from '@/common/constants'

const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

type Props = {
  full?: boolean
  style?: React.CSSProperties
  apiResponseData: BaseMoviesResponse | undefined
  isLoading?: boolean
  categoryMovieItemName: MoviesCategories
}

export const MovieCategoryModel = ({
  full = true,
  style,
  apiResponseData,
  isLoading,
  categoryMovieItemName,
}: Props) => {
  const movieList = apiResponseData?.results

  const formatedMovieList = full ? movieList : movieList?.slice(0, BRIEF_MOVIES_SIZE_ON_PAGE)

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

  return (
    <>
      {isLoading ? (
        skeletonWrapped
      ) : (
        <div className={s.movies}>
          {formatedMovieList?.map((movie) => {
            return (
              <MovieItem key={movie.id} movie={movie} style={style} categoryMovieItemName={categoryMovieItemName} />
            )
          })}
        </div>
      )}
    </>
  )
}
