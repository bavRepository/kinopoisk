import s from './cast.module.css'
import type { CastMember } from '@/features/movies/api/moviesApi.types.ts'
import { type ThemeMode } from '@/app/model/app-slice.ts'
import { SkeletonMovie } from '@/common/components/Skeleton/SkeletonMovie.tsx'

type Props = {
  castMemberListCut: CastMember[] | undefined
  getImg: (movie: string | null) => string
  currentTheme: ThemeMode
  isSimilarLoading: boolean
}

export const Cast = ({ currentTheme, getImg, castMemberListCut, isSimilarLoading }: Props) => {
  const colorNightClass = currentTheme === 'dark' ? ' ' + s.night : ''
  return (
    <div className={s.cast}>
      {castMemberListCut && castMemberListCut.length > 0 ? (
        <h1 className={s.castHeader + colorNightClass}>Cast</h1>
      ) : null}
      <div className={s.castContent}>
        {isSimilarLoading ? (
          <SkeletonMovie options={{ round: true, style: { borderRadius: 999, width: 180, height: 180 } }} />
        ) : (
          castMemberListCut?.map((cast) => {
            return (
              <div key={cast.id} className={s.castCard}>
                <img src={getImg(cast?.profile_path)} alt='#' className={s.castImg} />
                <div className={s.castImgDescWrapper}>
                  <p className={s.castName + colorNightClass}>{cast.name}</p>
                  <p className={s.castRole}>{cast.character}</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
