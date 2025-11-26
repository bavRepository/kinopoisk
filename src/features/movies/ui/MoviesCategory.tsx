import s from './moviesCategory.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { SubMovieNavItems } from '@/common/routing'
import type { FetchMoviesArgs } from '@/features/movies/api/moviesApi.types.ts'

export type OptionsType = { full: boolean; isFavorite?: boolean; style?: React.CSSProperties; params?: FetchMoviesArgs }

type PropsType = {
  options?: OptionsType
}

export const MoviesCategory = ({ options }: PropsType) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''

  return (
    <section className={s.movies + themeBgColorClasses} style={options?.style}>
      <Container>
        {SubMovieNavItems.map((categoryMovieItem) => {
          return <MoviesModel key={categoryMovieItem.path} options={options} categoryMovieItem={categoryMovieItem} />
        })}
      </Container>
    </section>
  )
}
