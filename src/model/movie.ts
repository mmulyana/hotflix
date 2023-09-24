export interface MovieI {
  adult: boolean
  backdrop_path: string | null
  genre_ids?: any
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string | number
  title: string
  video?: boolean
  vote_average: number
  vote_count: number
}

export type Genre = {
  id: number
  name: string
}

type ProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

type BelongsToCollection = {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface IMovieDetail extends MovieI {
  belongs_to_collection: BelongsToCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  imdb_id: string
  overview: string
  popularity: number
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  vote_average: number
  vote_count: number
}
