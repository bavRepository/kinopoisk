import s from './description.module.css'
import type { MovieDetails } from '@/features/movies/api/moviesApi.types.ts'
import type { ThemeMode } from '@/app/model/app-slice.ts'
import { MOVIES_RATING_VALUES } from '@/common/constants'
import { useAppHistory } from '@/common/hooks/useAppHistory.ts'

type Props = {
  getImg: (arg: string | undefined | null) => string
  detailedMovieInfo: MovieDetails | undefined
  currentTheme: ThemeMode
}

export const Description = ({ getImg, detailedMovieInfo, currentTheme }: Props) => {
  const { back, canGoBack } = useAppHistory()

  const colorNight = currentTheme === 'dark' ? ' ' + s.night : ''

  const rating = detailedMovieInfo?.vote_average || 0

  const ratingClass =
    rating <= MOVIES_RATING_VALUES.low
      ? ' ' + s.low
      : rating <= MOVIES_RATING_VALUES.medium
        ? ' ' + s.medium
        : ' ' + s.high

  return (
    <div className={s.movieDescWrapper}>
      <img src={getImg(detailedMovieInfo?.poster_path)} alt={detailedMovieInfo?.title} className={s.movieImg} />
      <div className={s.descWrapper}>
        <div className={s.descHeader}>
          <h1 className={s.title + colorNight}>{detailedMovieInfo?.title}</h1>
          <button
            disabled={!canGoBack()}
            onClick={back}
            className={s.backBtn + (currentTheme === 'dark' ? ' ' + s.moreNightBorder + ' ' + s.night : '')}
          >
            Back
          </button>
        </div>
        <div className={s.releaseWrapper}>
          <span className={s.releaseDesc + colorNight}>Release year: {detailedMovieInfo?.release_date}</span>
          <span className={s.rating + ratingClass}>{detailedMovieInfo?.vote_average.toFixed(1)}</span>
          <span className={s.releaseDesc + colorNight}>{detailedMovieInfo?.runtime}m</span>
        </div>
        <p className={s.desc + colorNight}>{detailedMovieInfo?.overview}</p>
        <div className={s.genreWrapper}>
          <h2 className={s.genresTitle + colorNight}>Genres</h2>
          <div className={s.genresItems}>
            {detailedMovieInfo?.genres?.map((genre) => (
              <div key={genre.id} className={s.genre}>
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
