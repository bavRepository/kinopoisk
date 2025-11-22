import type { moviesApiResponse } from '@/features/movies/api/moviesApi.types.ts'
import s from './ShortMovieCategoryModel.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'

type Props = {
  isLoading: boolean
  moviesResponse: moviesApiResponse | undefined
}
export const ShortMovieCategoryModel = ({ moviesResponse, isLoading }: Props) => {
  const shortMoviesList = !isLoading ? moviesResponse?.results.slice(0, 6) : []

  const skeletonWrapped = (
    <Box>
      {Array(shortMoviesList?.length)
        .fill(null)
        .map((_, id) => (
          <div key={id}>
            <Skeleton count={1} width={180} height={265} borderRadius={16} />
            <Skeleton count={1} width={110} height={24} borderRadius={6} />
          </div>
        ))}
    </Box>
  )

  return (
    <div className={s.contentWrapper}>
      {isLoading ? (
        skeletonWrapped
      ) : (
        <div className={s.movies}>
          {shortMoviesList?.map((movie) => {
            return <MovieItem movie={movie} />
          })}
        </div>
      )}
    </div>
  )
}
