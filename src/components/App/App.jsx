import { Component } from 'react'

import ErrorBoundry from '../ErrorBoudry'
import Tabs from '../Tabs'
import MoviesList from '../MoviesList'
import './App.css'
import RatedList from '../RatedList'
import SwapiService from '../services/swapiService'
import { Provider } from '../Context'

export default class App extends Component {
  swapiService = new SwapiService()

  state = {
    allGenres: [],
  }

  componentDidMount() {
    this.swapiService
      .getGenres()
      .then((genres) => {
        this.setState({ allGenres: genres })
      })
      .catch((err) => console.error(err))
  }

  render() {
    // console.log(`all: ${this.state.allGenres}`)
    return (
      <ErrorBoundry>
        <Provider value={this.state.allGenres}>
          <Tabs />
          <MoviesList />
          <RatedList />
        </Provider>
      </ErrorBoundry>
    )
  }
}
