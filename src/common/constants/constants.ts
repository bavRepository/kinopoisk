export const MOVIES_CATEGORIES = {
  PopularMovies: 'Popular Movies',
  TopRatedMovies: 'Top Rated Movies',
  UpcomingMovies: 'Upcoming Movies',
  NowPlayingMovies: 'Now Playing Movies',
  SearchMovies: 'Search Movies',
  SimilarMovies: 'Similar Movies',
  FilteredMovies: 'Filtered Movies',
} as const

export const MOVIES_RATING_VALUES = {
  low: 4,
  medium: 7,
} as const

export type MoviesCategories = (typeof MOVIES_CATEGORIES)[keyof typeof MOVIES_CATEGORIES] | undefined
