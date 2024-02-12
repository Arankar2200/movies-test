import { defineStore } from "pinia"

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: [],
    customMovies: [],
    currentMovie: null,
  }),
  actions: {
    createCustomMovie(movie) {
      this.customMovies.push(movie)
    },
    async fetchMovieById(url, params) {
      try {
        const data = await $fetch(url, {
          params,
        })
        if (!data.Error) this.currentMovie = data
        else throw new Error(data.Error)
      } catch (error) {
        throw error
      }
    },
    async fetchMovies(url, params, includeDirector = true) {
      try {
        const {
          Search,
          Response,
          Error: errorMessage,
        } = await $fetch(url, {
          params,
        })
        if (Response.includes("True")) {
          if (includeDirector) {
            const detailedMoviesPromises = Search.map((movie) => $fetch(url, { params: { i: movie.imdbID } }))
            //we cant get director by search, need to use this
            const detailedMovies = (await Promise.all(detailedMoviesPromises)).map(({ Director, Year, Title, imdbID, Poster }) => ({
              Director,
              Year,
              Poster,
              Title,
              imdbID,
            }))
            this.movies = { ...detailedMovies }
          } else {
            this.movies = { ...Search }
          }
        } else throw new Error(errorMessage)
      } catch (error) {
        throw error
      }
    },
  },
  persist: true,
})
