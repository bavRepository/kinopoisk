import s from './movieItem.module.css'
import type {
  CastMemberWithFavorite,
  ModifiedMovieType,
  MovieDomainType,
  SimilarMovieWithFavoriteType,
} from '@/features/movies/api/moviesApi.types.ts'
import { Link } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { Path } from '@/common/routing'
import noPoster from '@/assets/images/noposter.jpg'
import { isMovieWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import { changingLocalStorageMovies } from '@/common/utils/ChangingLocalStorageMovies.ts'
import { MOVIES_RATING_VALUES } from '@/common/constants'
import type { CSSProperties, Dispatch, SetStateAction } from 'react'

type Props = {
  style?: CSSProperties
  movie: MovieDomainType | ModifiedMovieType | SimilarMovieWithFavoriteType | CastMemberWithFavorite
  options?: OptionsType | undefined
  setFavoriteMoviesListFromLS?: Dispatch<
    SetStateAction<ModifiedMovieType[] | SimilarMovieWithFavoriteType[] | MovieDomainType[] | undefined>
  >
}
export const MovieItem = ({ movie, style, options, setFavoriteMoviesListFromLS }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()

  const isFavorite = options?.isFavorite
  const rating = isMovieWithProperty(movie, 'vote_average') ? Number(movie.vote_average) : 0
  const params = options?.params || undefined
  const imageConfiguration = options?.configuration?.images ?? undefined
  const toggleLikeHandler = () => {
    // Логика такая если в пропсах options и мы получаем isFavorite true значит мы запускаем этот компонент со страницы Favorite и значит у нас отрисуется массив элементов который пришел с Локала и лёг в useState в компаненте выше и который мы передали сюда в качестве data для отрисовки если снова же isFavorite в компаненте выше
    changingLocalStorageMovies({ movie, isFavorite, setFavoriteMoviesListFromLS, changeFavoriteCacheData, params })
  }

  const ratingClass =
    rating <= MOVIES_RATING_VALUES.low
      ? ' ' + s.low
      : rating <= MOVIES_RATING_VALUES.medium
        ? ' ' + s.medium
        : ' ' + s.high
  const poster_path =
    isMovieWithProperty(movie, 'poster_path') && movie.poster_path
      ? movie.poster_path || null
      : (isMovieWithProperty(movie, 'profile_path') && movie.profile_path) || null

  const isPosterPathNotExist = poster_path === null
  const posterImgPath = `${imageConfiguration?.secure_base_url || imageConfiguration?.secure_base_url}/${imageConfiguration?.poster_sizes[2]}${poster_path}`

  return (
    <>
      <div className={s.itemWrapper} style={{ width: style?.width, minHeight: style?.height }}>
        <div className={s.imgWrapper} style={style}>
          <Link to={`${Path.Movie}/${movie?.id}`} state={{ backTo: location.pathname }}>
            <img
              key={movie?.id}
              src={isPosterPathNotExist ? noPoster : posterImgPath}
              alt={(isMovieWithProperty(movie, 'title') && movie.title) || ''}
              className={s.img}
            />
          </Link>

          <button
            className={`${s.heartWrapper} ${isFavorite || movie?.favorite ? s.favoriteActive : ''}`}
            onClick={toggleLikeHandler}
          >
            <svg
              className={`${s.heart} ${isFavorite || movie?.favorite ? s.favoriteActive : ''}`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z'></path>
            </svg>
          </button>
          <span className={s.rating + ratingClass}>{rating && rating.toFixed(1)}</span>
        </div>
        <p className={s.desc + (currentTheme === 'dark' ? ' ' + s.night : '')}>
          {(isMovieWithProperty(movie, 'title') && movie.title) || ''}
        </p>
      </div>
    </>
  )
}
