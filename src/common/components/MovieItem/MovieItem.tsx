import s from './movieItem.module.css'
import type {
  CastMemberWithFavorite,
  MovieDomainType,
  SimilarMovieWithFavoriteType,
} from '@/features/movies/api/moviesApi.types.ts'
import { MOVIES_RATING_VALUES } from '@/common/constants'
import { Link } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { Path } from '@/common/routing'
import noPoster from '@/assets/images/noposter.jpg'
import { isMovieWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import { replaceMovieToFromLocalStorage } from '@/common/utils/replaceMovieToFromLocalStorage.ts'

type Props = {
  style?: React.CSSProperties
  movie: MovieDomainType | modifiedMovieType | SimilarMovieWithFavoriteType | CastMemberWithFavorite
  options?: OptionsType | undefined
  setFavoriteMoviesListFromLS?: React.Dispatch<
    React.SetStateAction<modifiedMovieType[] | SimilarMovieWithFavoriteType[] | MovieDomainType[] | undefined>
  >
}

export type modifiedMovieType = {
  id: MovieDomainType['id'] | undefined
  title: MovieDomainType['title'] | undefined
  poster_path: MovieDomainType['poster_path'] | undefined
  vote_average: MovieDomainType['vote_average'] | undefined
  favorite?: boolean | undefined
}

export const MovieItem = ({ movie, style, options, setFavoriteMoviesListFromLS }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()

  const isFavorite = options?.isFavorite || false
  const rating = isMovieWithProperty(movie, 'vote_average') ? Number(movie.vote_average) : 0
  const params = options?.params || undefined
  const imageConfiguration = options?.configuration?.images ?? undefined
  const toggleLikeHandler = () => {
    // Логика такая если в пропсах в options и мы получаем isFavorite true значит мы запускаем этот компонент со страницы Favorite и значит у нас отрисуется массив элементов который пришел с Локала и лёг в useState в компаненте выше и который мы передали сюда в качестве data для отрисовки если снова же isFavorite в компаненте выше
    replaceMovieToFromLocalStorage({ movie, isFavorite, setFavoriteMoviesListFromLS, changeFavoriteCacheData, params })
  }
  const ratingClasses =
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
  const posterImg = `${imageConfiguration?.secure_base_url || imageConfiguration?.secure_base_url}/${imageConfiguration?.poster_sizes[2]}${poster_path}`

  return (
    <>
      <div className={s.itemWrapper} style={{ width: style?.width, minHeight: style?.height }}>
        <div className={s.imgWrapper} style={style}>
          <Link to={`${Path.Movie}/${movie?.id}`}>
            <img
              key={movie?.id}
              src={isPosterPathNotExist ? noPoster : posterImg}
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
          <span className={s.rating + ratingClasses}>{rating && rating.toFixed(1)}</span>
        </div>
        <p className={s.desc + (currentTheme === 'dark' ? ' ' + s.night : '')}>
          {(isMovieWithProperty(movie, 'title') && movie.title) || ''}
        </p>
      </div>
    </>
  )
}
