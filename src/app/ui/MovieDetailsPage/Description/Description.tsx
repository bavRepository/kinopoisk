import s from './description.module.css'
import type { MovieDetails } from '@/features/movies/api/moviesApi.types.ts'

type Props = {
  getImg: (arg: string | undefined | null) => string
  searchData: MovieDetails | undefined
}
export const Description = ({ getImg, searchData }: Props) => {
  return (
    <div className={s.movieDescWrapper}>
      <img src={getImg(searchData?.poster_path)} alt='#' className={s.movieImg} />
      <div className={s.descWrapper}>
        <div className={s.descHeader}>
          <div className={s.title}>May She Rest in Peace</div>
          <div className={s.backBtn}>Back</div>
        </div>
        <div className={s.releaseWrapper}>
          <span className={s.releaseDesc}>Release year: 2021</span>
          <span className={s.rating}>0.0</span>
          <span className={s.releaseDesc}>Runtime: 17m</span>
        </div>
        <p className={s.desc}>
          A former bourgeoisie family's preoccupation with socio-economic identity continues even into death as they
          decide what the best burial plot for their aunt is.
        </p>
        <div className={s.genreWrapper}>
          <h2 className={s.genresTitle}>Genres</h2>
          <div className={s.genresItems}>
            <div className={s.genre}>Drama</div>
            <div className={s.genre}>Boevik</div>
          </div>
        </div>
      </div>
    </div>
  )
}
