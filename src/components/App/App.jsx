import React, { Component } from 'react'

import ErrorBoundry from '../ErrorBoudry'
import Tabs from '../Tabs'
import MoviesList from '../MoviesList'
import RatedList from '../RatedList'
import SwapiService from '../../services/swapiService'
import { Provider } from '../../services/Context'

export default class App extends Component {
  swapiService = new SwapiService()

  state = {
    allGenres: [],
    guestSessionId: '',
    searchPageActive: true,
    search: '',
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
        this.setState({ guestSessionId: res })
      })
      .catch((err) => console.error(err))
  }

  togglePage = () => {
    this.setState((prevState) => ({ searchPageActive: !prevState.searchPageActive }))
  }

  setSearch = (newSearch) => {
    this.setState({ search: newSearch })
  }

  render() {
    const value = {
      ...this.state,
      togglePage: this.togglePage,
      setSearch: this.setSearch,
    }

    return (
      <ErrorBoundry>
        <Provider value={value}>
          <Tabs />
          {this.state.searchPageActive ? <MoviesList /> : <RatedList />}
        </Provider>
      </ErrorBoundry>
    )
  }
}
