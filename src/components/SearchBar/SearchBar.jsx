import { Component } from 'react'
import './SearchBar.css'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
  }

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value })
    this.props.onSearch(event.target.value)
  }

  render() {
    return (
      <div className="searchContainer">
        <input
          className="search"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
          placeholder="Type to search..."
        />
      </div>
    )
  }
}
