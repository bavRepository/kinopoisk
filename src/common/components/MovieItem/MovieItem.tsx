import s from './movieItem.module.css'
import type { Movie } from '@/features/movies/api/moviesApi.types.ts'
import { IMAGES_API_SETTINGS, MOVIES_RATING_VALUES } from '@/common/constants'
import { Link } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'

type Props = {
  style?: React.CSSProperties
  movie: Movie
}

export const MovieItem = ({ movie, style }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const rating = Number(movie.vote_average.toFixed(1))
  const ratingClass =
    rating <= MOVIES_RATING_VALUES.low
      ? ' ' + s.low
      : rating <= MOVIES_RATING_VALUES.medium
        ? ' ' + s.medium
        : ' ' + s.high
  return (
    <>
      <div className={s.itemWrapper} style={{ width: style?.width, minHeight: style?.height }}>
        <div className={s.imgWrapper} style={style}>
          <Link to={'#'}>
            <img
              key={movie.id}
              src={`${IMAGES_API_SETTINGS.API_PATH + IMAGES_API_SETTINGS.IMAGE_SIZE.w185}${movie.poster_path}`}
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
          <span className={s.rating + ratingClass}>{rating.toFixed(1)}</span>
        </div>
        <p className={s.desc + (currentTheme === 'dark' ? ' ' + s.night : '')}>{movie.title}</p>
      </div>
    </>
  )
}
