import s from './movies.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { PopularMovies } from '@/features/movies/ui/PopularMovies/PopularMovies.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { TopMovies } from '@/features/movies/ui/TopMovies/TopMovies.tsx'
export const Movies = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''
  return (
    <section className={s.movies + themeBgColorClasses}>
      <Container>
        <PopularMovies />
        <TopMovies />
      </Container>
    </section>
  )
}
