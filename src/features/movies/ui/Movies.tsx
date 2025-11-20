import s from './movies.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { PopularMovies } from '@/features/movies/ui/PopularMovies/PopularMovies.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
export const Movies = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? s.bgColorNight : ''
  return (
    <section className={s.movies + ' ' + themeBgColorClasses}>
      <Container>
        <PopularMovies />
      </Container>
    </section>
  )
}
