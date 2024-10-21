import { Component, Fragment } from 'react'

import Error from '../Error'
import './RatedList.css'
import MyContext from '../../services/Context'
import SwapiService from '../../services/swapiService'
import Spinner from '../Spinner/Spinner'
import MovieCard from '../MovieCard'
import ListPagination from '../ListPagination'

export default class RatedList extends Component {
  static contextType = MyContext

  swapiService = new SwapiService()

  state = {
    error: false,
    loading: true,
    movies: [],
    guestSessionId: null,
    currentPage: 1,
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }
  componentDidMount() {
    this.updateGuestSessionId()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.guestSessionId !== prevState.guestSessionId) {
      this.getRatedMovies()
    }
  }

  updateGuestSessionId() {
    const guestSessionId = this.context ? this.context.guestSessionId : null
    if (guestSessionId !== this.state.guestSessionId) {
      this.setState({ guestSessionId }, () => {
        this.getRatedMovies()
      })
    }
  }

  getRatedMovies = (guestSessionId = this.state.guestSessionId, page = this.state.currentPage) => {
    if (!guestSessionId) {
      this.setState({ loading: false })
      return
    }

    this.setState({ loading: true })
    this.swapiService
      .getRatedMovies(guestSessionId, page)
      .then((movies) => {
        this.setState({
          movies: movies.results || [],
          totalPages: movies.total_pages,
          error: false,
          loading: false,
          currentPage: page,
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ error: true, loading: false, movies: [] })
      })
  }

  renderMovies() {
    return this.state.movies.map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        date={movie.release_date}
        description={movie.overview}
        poster={movie.poster_path}
        genre={movie.genre_ids}
        score={movie.vote_average}
        rating={movie.rating}
      />
    ))
  }

  handlePageChange = (page) => {
    this.setState({
      loading: true,
    })
    this.getRatedMovies(this.state.guestSessionId, page)
  }

  render() {
    const { error, loading, movies, currentPage, totalPages } = this.state

    const errorMessage = error ? <Error /> : null
    const spinner = loading ? Spinner() : null
    const hasData = !(loading || error)
    const noMovies = movies.length === 0 && hasData ? <div className="no-movies-found">No movies found.</div> : null
    const pagination =
      movies.length > 0 ? (
        <ListPagination currentPage={currentPage} totalPages={totalPages} onChange={this.handlePageChange} />
      ) : null
    const content = hasData ? this.renderMovies() : null

    return (
      <Fragment>
        <div className="containerForDetails">
          {noMovies}
          {errorMessage}
          {spinner}
        </div>
        <div className="ratedList moviesContainer">
          <ul className="movies">{content}</ul>
        </div>
        {pagination}
      </Fragment>
    )
  }
}
