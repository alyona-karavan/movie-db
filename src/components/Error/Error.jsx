import React from 'react'
import { Alert } from 'antd'
const Error = () => {
  const contentStyle = {
    width: '100%',
    height: '100%',
  }
  return (
    <div style={contentStyle}>
      <Alert message="Error" description="Failed to fetch." type="error" showIcon />
    </div>
  )
}

export default Error
