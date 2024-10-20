import { Alert, Spin } from 'antd'

const Spinner = (message, description) => {
  const contentStyle = {
    width: '100%',
    height: '100%',
  }

  return (
    <div style={contentStyle}>
      <Spin tip="Loading...">
        <Alert message={message} description={description} type="info" style={{ paddingTop: '220px' }} />
      </Spin>
    </div>
  )
}
export default Spinner
