import s from './movies.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { MOVIES_CATEGORIES } from '@/common/constants'

export const Movies = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''

  return (
    <section className={s.movies + themeBgColorClasses}>
      <Container>
        {Object.values(MOVIES_CATEGORIES).map((category) => {
          return <MoviesModel key={category} full={false} category={category} />
        })}
      </Container>
    </section>
  )
}
