import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { Promo } from '@/common/components/Promo/Promo.tsx'
import { MoviesCategory } from '@/features/movies/ui/MoviesCategory.tsx'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useAppDispatch } from '@/common/hooks'
import { useEffect } from 'react'
import { setConfigurationData } from '@/app/model/app-slice.ts'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetPopularMoviesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  })
  const { data: configurationData, isLoading: isConfigurationLoading } = useGetConfigurationQuery()

  // !isConfigurationLoading && dispatch(setConfigurationData({ imageConfiguration: configurationData?.images }))

  useEffect(() => {
    if (configurationData && configurationData.images && !isConfigurationLoading) {
      dispatch(setConfigurationData({ imageConfiguration: configurationData.images }))
    }
  }, [configurationData, dispatch, isConfigurationLoading])

  return (
    <>
      {isLoading && isConfigurationLoading && <LinearProgress />}
      <Promo popularMovies={data} isLoading={isLoading} />
      <MoviesCategory options={{ full: false }} />
    </>
  )
}
