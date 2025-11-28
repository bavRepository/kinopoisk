import { useEffect } from 'react'
import { getRandomBackgroundImageUrl } from '@/common/utils/getRandomImage.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import s from './promo.module.css'
import { SearchForm } from '@/common/components/SearchForm/SearchForm.tsx'
import Skeleton from 'react-loading-skeleton'
import { Box } from '@/common/components/Skeleton/Box.tsx'

import { useGetPromoMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'

type Props = {
  isLoadingHandler: (isLoading: boolean) => void
}
export const Promo = ({ isLoadingHandler }: Props) => {
  const { data: configuration, isLoading: isConfigurationLoading } = useGetConfigurationQuery()
  const { data, isLoading } = useGetPromoMoviesQuery()

  useEffect(() => {
    isLoadingHandler(isLoading)
  }, [isLoading])
  const imageConfiguration = configuration?.images ?? undefined

  const backgroundPictureUrl = getRandomBackgroundImageUrl(data?.results || [])

  const skeletonWrapped = (
    <Box style={{ display: 'block' }}>
      <Skeleton count={1} width={250} height={40} />
      <Skeleton count={1} width={405} height={30} style={{ marginTop: '45px' }} />
      <Skeleton count={1} width={568} height={50} borderRadius={20} style={{ marginTop: '25px' }} />
    </Box>
  )

  const containerStyles = { display: 'flex', alignItems: 'center', width: '100%' }

  if (isLoading || isConfigurationLoading)
    return (
      <section className={s.promo}>
        <Container style={containerStyles}>{skeletonWrapped}</Container>
      </section>
    )

  return (
    <section
      className={s.promo + ' ' + s.backgroundImage}
      style={{
        backgroundImage: `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url("${imageConfiguration?.secure_base_url}/${imageConfiguration?.backdrop_sizes[3]}/${backgroundPictureUrl}")`,
      }}
    >
      <Container style={containerStyles}>
        <div className={s.contentWrapper}>
          <h1 className={s.title}>Welcome</h1>
          <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
          <div className={s.formWrapper}>
            <SearchForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
