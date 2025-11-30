export type SortValuesType =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'original_title.desc'
  | 'original_title.asc'

export type filterSettingsObjType = {
  sortBy: SortValuesType
  selectedGenres: number[]
  page: number
  range: [number, number]
}
