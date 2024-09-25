const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmEyMjdjYjdmY2UwOTQ4NmJiMjdkMDdjOTE2NTc4ZiIsIm5iZiI6MTcyNzE1NzI4Mi4wNDAwOTgsInN1YiI6IjY2ZjI1MmMxZGUyZDUyZGZiZDhkNmI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eFGu4_yyS0NgDEFZ-TltRr1t0DcMMfgA_PAuVHeyEl0',
  },
}
const BASE_URL = 'https://api.themoviedb.org/3'
const searchURL = BASE_URL + '/search/movie?'

export default class SwapiService {
  async getResourse(url) {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved: ${res.status}`)
    }

    return await res.json()
  }

  async getMovies(search) {
    const res = await this.getResourse(searchURL + 'query=' + search)
    return res.results
  }
}
