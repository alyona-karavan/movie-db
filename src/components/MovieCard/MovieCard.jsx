import { Component, Fragment } from 'react'
import { format } from 'date-fns/format'
import { enGB } from 'date-fns/locale'

import { Consumer } from '../../services/Context'
import MyRate from '../MyRate'
import MovieRating from '../MovieRating'

import './MovieCard.css'

export default class MovieCard extends Component {
  state = {
    id: this.props.id,
    // rating: 0,
  }

  handleRate = (newRating) => {
    this.setState({ rating: newRating })
  }

  render() {
    return (
      <li className="card">
        <Card film={this.props} handleRate={this.handleRate} />
      </li>
    )
  }
}

function shortenDescription(description, maxLength) {
  const words = description.split(' ')
  let shortenedDescription = ''
  let currentLength = 0

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (currentLength + word.length <= maxLength) {
      shortenedDescription += word + ' '
      currentLength += word.length + 1
    } else {
      break
    }
  }

  if (currentLength < description.length) {
    shortenedDescription += '...'
  }

  return shortenedDescription.trim()
}

const Card = ({ film, handleRate }) => {
  const { poster, title, date, genre, description, score, id, rating } = film

  return (
    <Consumer>
      {(state) => {
        const allGenres = state.allGenres
        const genreNames = genre.map((genreId) => {
          const genreObject = allGenres.find((g) => g.id === genreId)
          return genreObject ? genreObject.name : null
        })

        return (
          <>
            <img
              className="image"
              src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : '/assets/images/no.png'}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
            <div className="aboutFilm">
              <MovieRating score={score} />
              <h2 className="title">{shortenDescription(title, 18)}</h2>
              <p className="date">{date ? format(new Date(date), 'LLLL d, yyyy', { locale: enGB }) : ''}</p>
              <div className="genre">
                {genreNames.map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
              </div>
            </div>
            <p className="description">{shortenDescription(description, 130)}</p>
            <MyRate handleRate={handleRate} rating={rating || 0} id={id} />
          </>
        )
      }}
    </Consumer>
  )
}
