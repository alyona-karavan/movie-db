import { Component, Fragment } from 'react'

import './Tabs.css'

export default class Tabs extends Component {
  render() {
    return (
      <Fragment>
        <div className="tabsSearch"></div>
        <div className="tabsRated"></div>
      </Fragment>
    )
  }
}
