import { Component } from 'react'

import Error from '../Error'
import './RatedList.css'
import { Consumer } from '../Context'
import SwapiService from '../services/swapiService'

export default class RatedList extends Component {
  swapiService = new SwapiService()

  state = {
    error: false,
    movies: [],
    guestSessionId: '',
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { guestSessionId } = this.state

    // Проверяем, изменился ли guestSessionId
    if (guestSessionId && guestSessionId !== prevState.guestSessionId) {
      this.getRatedMovies(guestSessionId)
    }
  }

  getRatedMovies = (guestSessionId) => {
    this.swapiService
      .getRatedMovies(guestSessionId)
      .then((res) => {
        console.log(`getRatedMovies:${res}`)
        this.setState({ movies: res })
      })
      .catch((err) => console.error(err))
  }

  setGuestSessionId = (guestSessionId) => {
    if (guestSessionId && guestSessionId !== this.state.guestSessionId) {
      this.setState({ guestSessionId })
    }
  }

  render() {
    if (this.state.error) {
      return <Error />
    }
    return (
      <Consumer>
        {(state) => {
          this.setGuestSessionId(state.guestSessionId)

          return <div className="ratedList"></div>
        }}
      </Consumer>
    )
  }
}
