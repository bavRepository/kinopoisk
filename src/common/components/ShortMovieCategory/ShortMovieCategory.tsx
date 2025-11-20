import type { moviesApiResponse } from '@/features/movies/api/moviesApi.types.ts'
import s from './ShortMovieCategory.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
type Props = {
  isLoading: boolean
  popularMovies: moviesApiResponse | undefined
}
export const ShortMovieCategory = ({ popularMovies, isLoading }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)

  const shortMoviesList = !isLoading ? popularMovies?.results.slice(0, 6) : []

  const themeColorClasses = currentTheme === 'dark' ? ' ' + s.colorNight : ''

  const skeletonWrapped = (
    <SkeletonTheme>
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
    </SkeletonTheme>
  )

  return (
    <div className={s.contentWrapper}>
      <div className={s.header}>
        <h2 className={s.title + themeColorClasses}>Popular movies</h2>
        <a href='#'>
          <button
            className={
              s.more + (currentTheme === 'dark' ? themeColorClasses + ' ' + s.moreNightBorder + ' ' + s.night : '')
            }
          >
            View more
          </button>
        </a>
      </div>
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
