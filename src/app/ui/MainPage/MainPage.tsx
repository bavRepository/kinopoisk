import { Promo } from '@/common/components/Promo/Promo.tsx'
import { MoviesCategory } from '@/features/movies/ui/MoviesCategory.tsx'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useAppDispatch } from '@/common/hooks'
import { useEffect, useState } from 'react'
import { setConfigurationData } from '@/app/model/app-slice.ts'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'

export const MainPage = () => {
  const dispatch = useAppDispatch()

  const { data: configurationData, isLoading: isConfigurationLoading } = useGetConfigurationQuery()

  // !isConfigurationLoading && dispatch(setConfigurationData({ imageConfiguration: configurationData?.images }))

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (configurationData && configurationData.images && !isConfigurationLoading) {
      dispatch(setConfigurationData({ imageConfiguration: configurationData.images }))
    }
  }, [configurationData, dispatch, isConfigurationLoading])

  const isLoadingHandler = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <>
      {isLoading && isConfigurationLoading && <LinearProgress />}
      <Promo isLoadingHandler={isLoadingHandler} />
      <MoviesCategory options={{ full: false }} />
    </>
  )
}
