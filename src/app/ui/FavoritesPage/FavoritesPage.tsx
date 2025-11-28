import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './favoritesPage.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { FAV_UPDATED_EVENT, localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'
import { useCallback, useEffect, useState } from 'react'
import type { ModifiedMovieType } from '@/features/movies/api/moviesApi.types.ts'

export const FavoritesPage = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const [favoriteList, setFavoriteList] = useState<ModifiedMovieType[]>(() =>
    restoreState<ModifiedMovieType[]>([], localStorageFavoriteKey),
  )

  const getLocalStorageData = useCallback(() => {
    setFavoriteList(restoreState<ModifiedMovieType[]>([], localStorageFavoriteKey))
  }, [])

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === localStorageFavoriteKey) getLocalStorageData()
    }
    const handleCustom = () => getLocalStorageData()

    window.addEventListener('storage', handleStorage)
    window.addEventListener(FAV_UPDATED_EVENT, handleCustom)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(FAV_UPDATED_EVENT, handleCustom)
    }
  }, [getLocalStorageData])

  const themeColors = s.title + (currentTheme === 'dark' ? ' ' + s.night : '')

  return (
    <section className={s.movieList + (currentTheme === 'dark' ? ' ' + s.night : '')}>
      <Container>
        <h1 className={themeColors}>Favorites movies</h1>
        <MovieCategoryModel options={{ full: true, isFavorite: true }} movies={favoriteList} isLoading={false} />
      </Container>
    </section>
  )
}
