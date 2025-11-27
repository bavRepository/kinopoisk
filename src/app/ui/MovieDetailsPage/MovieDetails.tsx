import s from './movieDetails.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import noPoster from '@/assets/images/noposter.jpg'
import { useParams } from 'react-router'
import { useGetCreditsQuery, useGetMovieQuery, useGetSimilarQuery } from '@/features/movies/api/moviesApi.ts'
import { useGetConfigurationQuery } from '@/app/model/configurationApi.ts'
import { Cast } from '@/app/ui/MovieDetailsPage/Cast/Cast.tsx'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { updateRequestCache } from '@/common/utils/updateRequestCache.ts'
import { MOVIES_CATEGORIES } from '@/common/constants'
import { useEffect } from 'react'
import { Description } from '@/app/ui/MovieDetailsPage/Description/Description.tsx'
import { Similar } from '@/app/ui/MovieDetailsPage/Similar/Similar.tsx'

const CAST_LIST_SIZE = 6

export const MovieDetails = () => {
  const uriParams = useParams()
  const id = { id: Number(uriParams?.id) }
  const { data: searchData, isLoading: isSearchDataLoading } = useGetMovieQuery(id)
  const { data: credits, isLoading: isCreditsLoading } = useGetCreditsQuery(id)
  const { data: configuration, isLoading: isConfigurationLoading } = useGetConfigurationQuery()
  const { data: similar, isLoading: isSimilarLoading } = useGetSimilarQuery(id)
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  useEffect(() => {
    if (similar) {
      updateRequestCache(similar, changeFavoriteCacheData, MOVIES_CATEGORIES.SimilarMovies, id)
    }
  }, [similar])

  const imageConfiguration = configuration?.images || undefined
  const castMemberListCut = credits?.cast.slice(0, CAST_LIST_SIZE)

  const getImg = (imgPath: string | undefined | null) => {
    if (!imgPath) return noPoster
    return `${imageConfiguration?.secure_base_url || imageConfiguration?.secure_base_url}/${imageConfiguration?.poster_sizes[2]}${imgPath}`
  }

  if (isSearchDataLoading || isConfigurationLoading || isCreditsLoading || isSimilarLoading)
    return <div>Loading...</div>
  return (
    <section className={s.movieDetails}>
      <Container style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Description getImg={getImg} searchData={searchData} />
        <Similar similarMovieResponse={similar} id={id} isSimilarLoading={isSimilarLoading} />
        <Cast castMemberListCut={castMemberListCut} getImg={getImg} />
      </Container>
    </section>
  )
}
