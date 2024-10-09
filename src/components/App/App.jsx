import { Component } from 'react'

import MoviesList from '../MoviesList'
import './App.css'
import ErrorBoundry from '../ErrorBoudry'

export default class App extends Component {
  state = {
    movieList: true,
  }

  render() {
    const movieList = this.state.movieList ? <MoviesList /> : null
    return <ErrorBoundry>{movieList}</ErrorBoundry>
  }
}
