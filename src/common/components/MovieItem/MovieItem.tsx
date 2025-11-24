import s from './movieItem.module.css'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { MOVIES_RATING_VALUES } from '@/common/constants'
import { Link } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectImageConfiguration, selectThemeMode } from '@/app/model/app-slice.ts'
import { localStorageFavoriteKey, restoreState, saveState } from '@/common/localStorage/localStorage.ts'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'

type Props = {
  style?: React.CSSProperties
  movie: MovieDomainType | modifiedMovieType
  options: OptionsType | undefined
  setFavoriteMoviesListFromLS: React.Dispatch<React.SetStateAction<modifiedMovieType[]>>
}

export type modifiedMovieType = {
  id: MovieDomainType['id']
  title: MovieDomainType['title']
  poster_path: MovieDomainType['poster_path']
  vote_average: MovieDomainType['vote_average']
  favorite?: boolean
}

export const MovieItem = ({ movie, style, options, setFavoriteMoviesListFromLS }: Props) => {
  const imageSettings = useAppSelector(selectImageConfiguration)
  const currentTheme = useAppSelector(selectThemeMode)
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()

  const isFavorite = options?.isFavorite || false
  const rating = movie.vote_average != null ? Number(movie.vote_average.toFixed(1)) : 0

  const toggleLikeHandler = () => {
    let moviesIdFromLS: modifiedMovieType[] = restoreState([], localStorageFavoriteKey)

    // Логика такая если в пропсах в options мы получаем isFavorite true значит мы запускаем этот компонент со страницы Favorite и значит у нас отрисуется массив элементов который пришел с Локала и лёг в useState в компаненте выше и который мы передали сюда в качестве data для отрисовки если снова же isFavorite в компаненте выше
    if (isFavorite) {
      setFavoriteMoviesListFromLS(() => {
        return moviesIdFromLS.filter((movieFromLs) => movieFromLs.id !== movie.id)
      })

      moviesIdFromLS = moviesIdFromLS?.filter((movieLS) => movieLS.id !== movie.id)
      saveState(moviesIdFromLS, localStorageFavoriteKey)
      changeFavoriteCacheData(movie.id, false)
    } else {
      if (movie.favorite) {
        moviesIdFromLS = moviesIdFromLS?.filter((movieLS) => movieLS.id !== movie.id)

        saveState(moviesIdFromLS, localStorageFavoriteKey)
      } else {
        const index = moviesIdFromLS.findIndex((lsItem) => lsItem.id === movie.id)

        if (index != -1) {
          changeFavoriteCacheData(movie.id, !movie.favorite)
          return
        }

        const modifiedMovie = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        }
        moviesIdFromLS.push(modifiedMovie)
        saveState(moviesIdFromLS, localStorageFavoriteKey)
      }
      changeFavoriteCacheData(movie.id, !movie.favorite)
    }
  }

  const posterSize =
    imageSettings?.backdrop_sizes && imageSettings.poster_sizes.length > 0 ? imageSettings.backdrop_sizes[2] : 'w185'

  const ratingClasses =
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
              src={`${imageSettings?.secure_base_url}/${posterSize}/${movie.poster_path}`}
              alt={movie.title}
              className={s.img}
            />
          </Link>

          <button
            className={`${s.heartWrapper} ${isFavorite || movie.favorite ? s.favoriteActive : ''}`}
            onClick={toggleLikeHandler}
          >
            <svg
              className={`${s.heart} ${isFavorite || movie.favorite ? s.favoriteActive : ''}`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              aria-hidden='true'
              focusable='false'
            >
              <path d='M12 21.35 10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z'></path>
            </svg>
          </button>
          <span className={s.rating + ratingClasses}>{rating.toFixed(1)}</span>
        </div>
        <p className={s.desc + (currentTheme === 'dark' ? ' ' + s.night : '')}>{movie.title}</p>
      </div>
    </>
  )
}
