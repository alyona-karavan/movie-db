import { Component, Fragment } from 'react'
import { Spin } from 'antd'
import { format } from 'date-fns/format'
import { enGB } from 'date-fns/locale'

import './MovieCard.css'

export default class MovieCard extends Component {
  render() {
    console.log(this.props.loading)
    const spiner = this.props.loading ? <Spin /> : null
    const content = !this.props.loading ? <Card film={this.props} /> : null
    return (
      <li className="card">
        {spiner}
        {content}
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

const Card = ({ film }) => {
  const { poster, title, date, genre, description } = film
  return (
    <Fragment>
      <img className="image" src={`https://image.tmdb.org/t/p/w500${poster}`} />
      <div className="aboutFilm">
        <h2 className="title">{title}</h2>
        <p className="date">{date ? format(new Date(date), 'LLLL d, yyyy', { locale: enGB }) : ''}</p>
        <div className="genre">
          <p>{genre}</p>
          <p>{genre}</p>
        </div>
      </div>
      <p className="description">{shortenDescription(description, 250)}</p>
    </Fragment>
  )
}
