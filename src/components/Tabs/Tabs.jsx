import { Component } from 'react'

import { Consumer } from '../../services/Context'
import './Tabs.css'

export default class Tabs extends Component {
  render() {
    return (
      <Consumer>
        {({ searchPageActive, togglePage }) => (
          <div className="tab-container">
            <div className={`tab ${searchPageActive ? 'active' : ''}`} onClick={togglePage}>
              Search
            </div>
            <div className={`tab ${!searchPageActive ? 'active' : ''}`} onClick={togglePage}>
              Rated
            </div>
          </div>
        )}
      </Consumer>
    )
  }
}
