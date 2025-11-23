import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './moviesHeader.module.css'
import { Link } from 'react-router'
import { Path, type SubMovieNavItemsType } from '@/common/routing'

type Props = {
  categoryMovieItem: SubMovieNavItemsType
  full: boolean
}

export const MoviesHeader = ({ categoryMovieItem, full }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeColor = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  return (
    <div className={s.header}>
      <h2 className={s.title + themeColor}>{categoryMovieItem.name}</h2>
      <a href='#'>
        {!full && (
          <Link
            to={`${Path.Movies}/${categoryMovieItem.path}`}
            className={s.more + (currentTheme === 'dark' ? themeColor + ' ' + s.moreNightBorder + ' ' + s.night : '')}
          >
            View more
          </Link>
        )}
      </a>
    </div>
  )
}
