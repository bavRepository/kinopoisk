import { getRandomIndex } from '@/common/utils/getRandomIndex.ts'
import type { Movie } from '@/features/movies/api/popularMoviesApi.types.ts'

export const getRandomBackgroundImageUrl = (arr: Movie[]) => {
  const index = getRandomIndex(arr)
  return index && arr[index].backdrop_path
}
