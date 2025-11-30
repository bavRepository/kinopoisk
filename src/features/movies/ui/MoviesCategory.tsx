import s from './moviesCategory.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { SubMovieNavItems } from '@/common/routing'
import type { ApiConfigurationResponse, FetchMoviesArgs } from '@/features/movies/api/moviesApi.types.ts'

export type OptionsType = {
  full?: boolean
  isFavorite?: boolean
  style?: React.CSSProperties
  params?: FetchMoviesArgs
  configuration?: ApiConfigurationResponse
  skeleton?: boolean
  skeletonSize?: number
  round?: boolean
}

type PropsType = {
  options?: OptionsType
}

export const MoviesCategory = ({ options }: PropsType) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''

  return (
    <section className={s.movies + themeBgColorClasses}>
      <Container>
        {SubMovieNavItems.map((categoryMovieItem) => {
          return <MoviesModel key={categoryMovieItem.path} options={options} categoryMovieItem={categoryMovieItem} />
        })}
      </Container>
    </section>
  )
}
