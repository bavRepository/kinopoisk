import { useMemo } from 'react'
import { getRandomBackgroundImageUrl } from '@/common/utils/getRandomImage.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import s from './promo.module.css'
import type { moviesApiResponse } from '@/features/movies/api/moviesApi.types.ts'
import { SearchForm } from '@/common/components/SearchForm/SearchForm.tsx'
import Skeleton from 'react-loading-skeleton'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import { IMAGES_API_SETTINGS } from '@/common/constants'

type Props = {
  popularMovies: moviesApiResponse | undefined
  isLoading: boolean
}
export const Promo = ({ popularMovies, isLoading }: Props) => {
  const backgroundPictureUrl = useMemo(() => {
    return getRandomBackgroundImageUrl(popularMovies?.results || [])
  }, [popularMovies?.results])

  const skeletonWrapped = (
    <Box style={{ display: 'block' }}>
      <Skeleton count={1} width={250} height={40} />
      <Skeleton count={1} width={405} height={30} style={{ marginTop: '45px' }} />
      <Skeleton count={1} width={568} height={50} borderRadius={20} style={{ marginTop: '25px' }} />
    </Box>
  )

  return (
    <section
      className={s.promo + ' ' + s.backgroundImage}
      style={{
        backgroundImage: `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url("${IMAGES_API_SETTINGS.API_PATH}/${IMAGES_API_SETTINGS.IMAGE_SIZE.original}/${backgroundPictureUrl}")`,
      }}
    >
      <Container style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {isLoading ? (
          skeletonWrapped
        ) : (
          <div className={s.contentWrapper}>
            <h1 className={s.title}>Welcome</h1>
            <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
            <SearchForm />
          </div>
        )}
      </Container>
    </section>
  )
}
