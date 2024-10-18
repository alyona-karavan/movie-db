const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmEyMjdjYjdmY2UwOTQ4NmJiMjdkMDdjOTE2NTc4ZiIsIm5iZiI6MTcyNzE1NzI4Mi4wNDAwOTgsInN1YiI6IjY2ZjI1MmMxZGUyZDUyZGZiZDhkNmI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eFGu4_yyS0NgDEFZ-TltRr1t0DcMMfgA_PAuVHeyEl0',
  },
}
const baseURL = 'https://api.themoviedb.org/3'
const searchURL = baseURL + '/search/movie?'

export default class SwapiService {
  getResourse = async (url) => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, recieved: ${res.status}`)
      }

      return await res.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  getMovies = async (search, page) => {
    const res = await this.getResourse(`${searchURL}query=${search}&page=${page}`)
    return {
      results: res.results,
      total_pages: res.total_pages,
    }
  }

  // getGenres = async () => {
  //   await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return response
  //     })
  //     .catch((err) => console.error(err))
  // }

  getGenres = async () => {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    const res = await response.json()
    // console.log(res.genres)
    return res.genres
  }
}

// const swapi = new SwapiService()
// console.log(`getGenres: ${swapi.getGenres()}`)

//array of obj: [{id: 456, name: 'Family'},{}.{}]
