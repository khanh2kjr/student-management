import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Typography align="center">
      Sai đường dẫn!
      <Link to="/students">Quay về trang danh sách sinh viên</Link>
    </Typography>
  )
}

export default NotFound
