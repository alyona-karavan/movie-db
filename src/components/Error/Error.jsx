import React from 'react'
import { Alert } from 'antd'
const Error = () => {
  const contentStyle = {
    width: '100%',
    height: '100%',
  }
  return (
    <div style={contentStyle}>
      <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
    </div>
  )
}

export default Error
