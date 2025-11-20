import s from './movieItem.module.css'
import type { Movie } from '@/features/movies/api/moviesApi.types.ts'
import { IMAGES_PROCESSED } from '@/common/constants'
import { Link } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'

type Props = {
  style?: React.CSSProperties
  shortMoviesList: Movie[] | undefined
}
export const MovieItem = ({ shortMoviesList }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  return (
    <>
      {shortMoviesList?.map((movie) => {
        return (
          <div className={s.itemWrapper}>
            <div className={s.imgWrapper}>
              <Link to={'#'}>
                <img
                  key={movie.id}
                  src={`${IMAGES_PROCESSED.POSTER_API_PATH + IMAGES_PROCESSED.IMAGE_SIZE}/${movie.poster_path}`}
                  alt={movie.title}
                  className={s.img}
                />
              </Link>

              <div className={s.heartWrapper}>
                <svg
                  className={s.heart}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                  focusable='false'
                >
                  <path d='M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z'></path>
                </svg>
              </div>
              <span className={s.rating}>4.4</span>
            </div>
            <p className={s.desc + (currentTheme === 'dark' ? ' ' + s.night : '')}>{movie.title}</p>
          </div>
        )
      })}
    </>
  )
}
