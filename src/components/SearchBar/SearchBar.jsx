import { Component } from 'react'

import './SearchBar.css'
import Context from '../../services/Context'

export default class SearchBar extends Component {
  static contextType = Context

  handleInputChange = (event) => {
    this.props.onSearch(event.target.value)
  }

  render() {
    const { search } = this.context

    return (
      <div className="searchContainer">
        <input
          className="search"
          type="text"
          value={search}
          onChange={this.handleInputChange}
          placeholder="Type to search..."
        />
      </div>
    )
  }
}
