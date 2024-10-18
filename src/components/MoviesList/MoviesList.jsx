import { Component, Fragment } from 'react'
import debounce from 'lodash/debounce'

import SearchBar from '../SearchBar'
import MovieCard from '../MovieCard'
import './MoviesList.css'
import SwapiService from '../services/swapiService'
import Spinner from '../Spinner/Spinner'
import Error from '../Error'
import ListPagination from '../ListPagination'

export default class MoviesList extends Component {
  swapiService = new SwapiService()

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      error: false,
      totalPages: 0,
      currentPage: 1,
      pageSize: 20,
      search: '',
    }
    this.handleSearchDebounced = debounce(this.getMovies.bind(this), 500)
  }

  componentDidMount() {
    this.getMovies(this.state.search, 1)
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getMovies = (search, page = this.state.currentPage) => {
    this.swapiService
      .getMovies(search, page)
      .then((films) => {
        console.log(films)
        this.setState({
          movies: films.results,
          totalPages: films.total_pages,
          error: false,
          loading: false,
          currentPage: page,
          search: search,
        })
      })
      .catch((error) => {
        this.onError(error)
      })
  }

  handlePageChange = (page) => {
    this.setState({
      loading: true,
    })
    this.getMovies(this.state.search, page)
  }

  handleSearch = (searchTerm) => {
    this.setState({
      loading: true,
    })
    this.handleSearchDebounced(searchTerm)
  }

  render() {
    const { movies, loading, error, currentPage, totalPages, search } = this.state

    const renderMovieCard = (film) => (
      <MovieCard
        key={film.id}
        id={film.id}
        title={film.title}
        date={film.release_date}
        description={film.overview}
        poster={film.poster_path}
        genre={film.genre_ids}
        score={film.vote_average}
      />
    )

    const hasData = !(loading || error)

    const searchBar = <SearchBar onSearch={this.handleSearch} />

    const errorMessage = error ? <Error /> : null
    const spinner = loading ? Spinner('List of movies is loading', 'wait') : null
    const content = hasData ? movies.map(renderMovieCard) : null
    const noMovies =
      search !== '' && movies.length === 0 && hasData ? <div className="no-movies-found">No movies found.</div> : null
    const pagination =
      movies.length > 0 ? (
        <ListPagination currentPage={currentPage} totalPages={totalPages} onChange={this.handlePageChange} />
      ) : null

    return (
      <Fragment>
        {searchBar}
        <div className="containerForDetails">
          {noMovies}
          {errorMessage}
          {spinner}
        </div>
        <div className="moviesContainer">
          <ul className="movies">{content}</ul>
        </div>
        {pagination}
      </Fragment>
    )
  }
}
