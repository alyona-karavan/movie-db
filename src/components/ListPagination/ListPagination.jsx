import React, { Component } from 'react'
import { Pagination } from 'antd'
import './ListPagination.css'

export default class ListPagination extends Component {
  render() {
    const { currentPage, totalPages, onChange } = this.props

    return (
      <Pagination
        defaultCurrent={currentPage}
        total={totalPages * 20}
        pageSize={20}
        onChange={onChange}
        showSizeChanger={false}
        hideOnSinglePage={true}
      />
    )
  }
}
