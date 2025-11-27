import { Promo } from '@/common/components/Promo/Promo.tsx'
import { MoviesCategory } from '@/features/movies/ui/MoviesCategory.tsx'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useState } from 'react'
import s from './mainPage.module.css'

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const isLoadingHandler = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <section className={s.main}>
      {isLoading && <LinearProgress />}
      <Promo isLoadingHandler={isLoadingHandler} />
      <MoviesCategory options={{ full: false }} />
    </section>
  )
}
