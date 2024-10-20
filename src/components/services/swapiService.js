const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer d460282b6c4c640a98e65967fe37cd43',
  },
}

const baseURL = 'https://api.themoviedb.org/3'
const searchURL = baseURL + '/search/movie?'
const API_KEY = 'd460282b6c4c640a98e65967fe37cd43'

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
    const res = await this.getResourse(`${searchURL}query=${search}&page=${page}&api_key=${API_KEY}`)
    return {
      results: res.results,
      total_pages: res.total_pages,
    }
  }

  getGenres = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    const res = await response.json()
    return res.genres
  }

  createGuestSession = async () => {
    const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Ошибка при создании гостевой сессии: ${response.status}`)
      }

      const data = await response.json()
      return data.guest_session_id
    } catch (error) {
      console.error('Ошибка при создании гостевой сессии:', error.message)
      throw error
    }
  }

  getRatedMovies = async (guestSessionId) => {
    const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Гостевая сессия не найдена или не существует.')
        } else {
          throw new Error(`Ошибка при получении оцененных фильмов: ${response.status}`)
        }
      }

      const res = await response.json()
      return {
        results: res.results,
        total_pages: res.total_pages,
      }
    } catch (error) {
      console.error('Ошибка при получении оцененных фильмов:', error.message)
      throw error
    }
  }

  addRating = async (guestSessionId, movieId, rating) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ value: rating }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json() // Получаем данные об ошибке
        throw new Error(`Ошибка при добавлении рейтинга: ${response.status} ${errorData.status_message}`)
      }

      const responseData = await response.json()
      console.log('Успешно добавлен рейтинг для фильма:', responseData)
      return responseData
    } catch (error) {
      console.error('Ошибка при добавлении рейтинга:', error.message)
      throw error // Пробрасываем ошибку дальше
    }
  }
}
