import { Component } from 'react'

import MovieCard from '../MovieCard'
import './MoviesList.css'

export default class MoviesList extends Component {
  state = {}

  render() {
    const { films } = this.props
    const movies = films.map((film) => {
      return <MovieCard {...film} key={film.id} id={film.id} />
    })

    return <ul className="movies">{movies}</ul>
  }
}

// const elements = data.map((item) => {
//     return (
//       <Task
//         {...item}
//         key={item.id}
//         id={item.id}
//         onDelete={() => {
//           onDelete(item.id)
//         }}
//         onDone={() => {
//           onDone(item.id)
//         }}
//         onEdit={onEdit}
//         addItem={() => addItem(item.id)}
//       />
//     )
//   })

//   return <ul className="todo-list">{elements}</ul>
