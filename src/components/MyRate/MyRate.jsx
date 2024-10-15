import React, { Component } from 'react'
import { Rate } from 'antd'
export default class MyRate extends Component {
  handleChange = (value) => {
    this.props.handleRate(value)
  }

  render() {
    return <Rate onChange={this.handleChange} value={this.props.rating} />
  }
}
