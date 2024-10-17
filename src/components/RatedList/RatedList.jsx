import { Component } from 'react'

import Error from '../Error'
import './RatedList.css'

export default class RatedList extends Component {
  state = {
    error: false,
  }

  componentDidCatch() {
    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <Error />
    }
    return <div></div>
  }
}
