import React, { Component } from 'react'
import { Rate } from 'antd'

import { Consumer } from '../Context'
import SwapiService from '../services/swapiService'
export default class MyRate extends Component {
  swapiService = new SwapiService()

  state = {
    rating: this.props.rating,
    movieId: this.props.id,
  }

  handleChange = (value) => {
    console.log('Выбранный рейтинг:', value)
    this.setState({ rating: value }, () => {
      console.log('guestId:', this.state.guestId)
      console.log('movieId:', this.state.movieId)

      if (this.state.guestId && this.state.movieId) {
        this.addRating(this.state.guestId, this.state.movieId, this.state.rating)
      } else {
        console.error('Отсутствует guestSessionId или movieId')
      }
    })
  }

  addRating = (guestSessionId, movieId, rating) => {
    this.swapiService
      .addRating(guestSessionId, movieId, rating)
      .then((res) => {
        console.log('Рейтинг успешно сохранен:', res)
      })
      .catch((err) => console.error('Ошибка при сохранении рейтинга:', err))
  }

  render() {
    return (
      <Consumer>
        {(state) => {
          const id = state.guestSessionId
          if (!this.state.guestId) {
            this.setState({ guestId: id })
          }

          return <Rate onChange={this.handleChange} value={this.state.rating} count={10} allowHalf />
        }}
      </Consumer>
    )
  }
}
