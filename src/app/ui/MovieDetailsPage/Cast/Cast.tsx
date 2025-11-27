import s from '@/app/ui/MovieDetailsPage/movieDetails.module.css'
import type { CastMember } from '@/features/movies/api/moviesApi.types.ts'

type Props = {
  castMemberListCut: CastMember[] | undefined
  getImg: (movie: string | null) => string
}
export const Cast = (props: Props) => {
  const { castMemberListCut, getImg } = props
  return (
    <div className={s.cast}>
      <div className={s.castHeader}>Cast</div>
      <div className={s.castContent}>
        {castMemberListCut?.map((cast) => {
          return (
            <div key={cast.id} className={s.castCard}>
              <img src={getImg(cast?.profile_path)} alt='#' className={s.castImg} />
              <div className={s.castImgDescWrapper}>
                <p className={s.castName}>{cast.name}</p>
                <p className={s.castRole}>{cast.character}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
