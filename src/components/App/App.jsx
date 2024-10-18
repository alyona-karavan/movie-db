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
    guestSessionId: '',
  }

  componentDidMount() {
    this.swapiService
      .getGenres()
      .then((genres) => {
        this.setState({ allGenres: genres })
      })
      .catch((err) => console.error(err))

    this.swapiService
      .createGuestSession()
      .then((res) => {
        this.setState({ guestSessionId: res.guest_session_id })
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <ErrorBoundry>
        <Provider value={this.state}>
          <Tabs />
          <MoviesList />
          <RatedList />
        </Provider>
      </ErrorBoundry>
    )
  }
}
