import { Component } from 'react'

import MovieCard from '../MovieCard'
import './MoviesList.css'
import SwapiService from '../services/swapiService'

export default class MoviesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    this.SwapiService = new SwapiService()
    this.getMovies()
  }

  getMovies() {
    this.SwapiService.getMovies('return').then((films) => {
      this.setState({ movies: films })
    })
  }

  render() {
    return (
      <ul className="movies">
        {this.state.movies.map((film) => (
          <MovieCard
            title={film.title}
            key={film.id}
            id={film.id}
            date={film.release_date}
            description={film.overview}
            poster={film.poster_path}
            genre={film.genre_ids}
          />
        ))}
      </ul>
    )
  }
}
