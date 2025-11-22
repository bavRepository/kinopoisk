import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './moviesHeader.module.css'

type Props = {
  title: string
  full: boolean
}

export const MoviesHeader = ({ title, full }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeColor = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  return (
    <div className={s.header}>
      <h2 className={s.title + themeColor}>{title}</h2>
      <a href='#'>
        {!full && (
          <button
            className={s.more + (currentTheme === 'dark' ? themeColor + ' ' + s.moreNightBorder + ' ' + s.night : '')}
          >
            View more
          </button>
        )}
      </a>
    </div>
  )
}
