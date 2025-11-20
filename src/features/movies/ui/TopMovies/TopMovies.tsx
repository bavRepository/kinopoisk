import { useGetTopRatedMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { ShortMovieCategory } from '@/common/components/ShortMovieCategory/ShortMovieCategory.tsx'
import s from '@/common/components/ShortMovieCategory/ShortMovieCategory.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'

export const TopMovies = () => {
  const { data, isLoading } = useGetTopRatedMoviesQuery()
  const currentTheme = useAppSelector(selectThemeMode)
  const themeColorClasses = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  return (
    <>
      <div className={s.header}>
        <h2 className={s.title + themeColorClasses}>Top movies</h2>
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
      <ShortMovieCategory popularMovies={data} isLoading={isLoading} />
    </>
  )
}
