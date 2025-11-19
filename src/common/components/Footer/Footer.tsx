import { Container } from '@/common/components/Container/Container.tsx'
import s from './footer.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
export const Footer = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const footerBgClasses = currentTheme === 'light' ? s.day : s.night
  return (
    <section className={s.footer + ' ' + footerBgClasses}>
      <Container>
        <div className={s.details}>© 2025 Kinopoisk Demo · Data courtesy of TMDB.</div>
      </Container>
    </section>
  )
}
