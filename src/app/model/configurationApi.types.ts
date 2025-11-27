export type MoviesImages =
  | {
      base_url: string
      secure_base_url: string
      backdrop_sizes: string[]
      logo_sizes: string[]
      poster_sizes: string[]
      profile_sizes: string[]
      still_sizes: string[]
    }
  | undefined

export type ApiConfigurationResponse =
  | {
      change_keys: string[]
      images: MoviesImages
    }
  | undefined
