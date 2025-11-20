import type { moviesApiResponse } from '@/features/movies/api/moviesApi.types.ts'
import s from './ShortMovieCategory.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'

type Props = {
  isLoading: boolean
  popularMovies: moviesApiResponse | undefined
}
export const ShortMovieCategory = ({ popularMovies, isLoading }: Props) => {
  const shortMoviesList = !isLoading ? popularMovies?.results.slice(0, 6) : []

  const skeletonWrapped = (
    <Box>
      {Array(6)
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
          <MovieItem shortMoviesList={shortMoviesList} />
        </div>
      )}
    </div>
  )
}
