import s from './movies.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { SubMovieNavItems } from '@/common/routing'

export const Movies = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''

  return (
    <section className={s.movies + themeBgColorClasses}>
      <Container>
        {SubMovieNavItems.map((categoryMovieItem) => {
          return <MoviesModel key={categoryMovieItem.path} full={false} categoryMovieItem={categoryMovieItem} />
        })}
      </Container>
    </section>
  )
}
