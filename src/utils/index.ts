export interface genres {
  [key: number]: string
}

export const genresById: genres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

export const TOKEN = process.env.NEXT_PUBLIC_TOKEN
export const BASE_URL = 'https://api.themoviedb.org/3'
export const BASE_URL_IMG = 'https://image.tmdb.org/t/p/original'

export const movieRequests = [
  {
    title: 'Playing Now',
    url: `${BASE_URL}/movie/now_playing?api_key=${TOKEN}`,
  },
  {
    title: 'Upcoming',
    url: `${BASE_URL}/movie/upcoming?api_key=${TOKEN}`,
  },
  {
    title: 'Top Rated',
    url: `${BASE_URL}/movie/top_rated?api_key=${TOKEN}`,
  },
]
