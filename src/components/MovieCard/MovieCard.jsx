import { Component, Fragment } from 'react'
import { format } from 'date-fns/format'
import { enGB } from 'date-fns/locale'

import { Consumer } from '../Context'
import MyRate from '../MyRate'

import './MovieCard.css'

export default class MovieCard extends Component {
  state = {
    id: this.props.id,
    rating: 0,
  }

  handleRate = (newRating) => {
    this.setState({ rating: newRating })
  }

  render() {
    return (
      <li className="card">
        <Card film={this.props} rating={this.state.rating} handleRate={this.handleRate} />
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

const Card = ({ film, handleRate, rating }) => {
  const { poster, title, date, genre, description } = film

  return (
    <Consumer>
      {(allGenres) => {
        const genreNames = genre.map((genreId) => {
          const genreObject = allGenres.find((g) => g.id === genreId)
          return genreObject ? genreObject.name : null
        })

        return (
          <Fragment>
            <img className="image" src={`https://image.tmdb.org/t/p/w500${poster}`} />
            <div className="aboutFilm">
              <h2 className="title">{shortenDescription(title, 18)}</h2>
              <p className="date">{date ? format(new Date(date), 'LLLL d, yyyy', { locale: enGB }) : ''}</p>
              <div className="genre">
                {genreNames.map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
              </div>
            </div>
            <p className="description">{shortenDescription(description, 130)}</p>
            <MyRate handleRate={handleRate} rating={rating} />
          </Fragment>
        )
      }}
    </Consumer>
  )
}
