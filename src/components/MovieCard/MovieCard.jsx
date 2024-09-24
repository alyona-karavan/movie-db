import { Component } from 'react'
import './MovieCard.css'

export default class MovieCard extends Component {
  state = {
    title: null,
    date: null,
    genre: null,
    description: null,
  }

  render() {
    const { title, date, genre, description } = this.state
    return (
      <li className="card">
        <img className="image" src="./dermoDemon.jpg" alt="dermoDemon" />
        <div className="aboutFilm">
          <h2 className="title">{title}</h2>
          <p className="date">{date}</p>
          <div className="genre">
            <p>{genre}</p>
            <p>{genre}</p>
          </div>
        </div>
        <p className="description">{description}</p>
      </li>
    )
  }
}
