// import type { Movie } from '@/features/movies/api/popularMoviesApi.types.ts'
import s from './ShortMovieCategory.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
/*type Props = {
  title?: string
  movies?: Movie[]
}*/
export const ShortMovieCategory = (/*props: Props*/) => {
  const currentTheme = useAppSelector(selectThemeMode)

  const themeColorClasses = currentTheme === 'dark' ? ' ' + s.colorNight : ''

  return (
    <div className={s.contentWrapper}>
      <div className={s.header}>
        <h2 className={s.title + themeColorClasses}>Popular movies</h2>
        <a href='#'>
          <button className={s.more + (currentTheme === 'dark' ? themeColorClasses + ' ' + s.moreNightBorder : '')}>
            View more
          </button>
        </a>
      </div>
      <div className={s.movies}></div>
    </div>
  )
}
