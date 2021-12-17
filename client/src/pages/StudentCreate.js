import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { studentApi } from 'api'
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { DialogConfirm, STUDENT_FIELD } from './StudentDetail'
import { STUDENT_HEAD_ROW } from './StudentList'

const defaultStudentValue = {
  studentCode: '',
  fullName: '',
  email: '',
  phoneNumber: '',
}

const StudentCreate = () => {
  const classes = useStyles()
  const history = useHistory()

  const [student, setStudent] = useState(defaultStudentValue)
  const [isShowDialogCreate, setIsShowDialogCreate] = useState(false)

  const handleStudentChange = (event, key) => {
    setStudent({ ...student, [key]: event.target.value })
  }

  const handleDialogCreateOpen = () => {
    if (!student.studentCode || !student.fullName) return
    setIsShowDialogCreate(true)
  }

  const handleDialogCreateClose = () => {
    setIsShowDialogCreate(false)
  }

  const handleStudentCreate = () => {
    studentApi
      .createStudent(student)
      .then(() => {
        alert(
          `Thêm thành công sinh viên ${student.fullName} có mã sinh viên: ${student.studentCode} vào hệ thống`
        )
        history.push('/students')
      })
      .catch(() => {
        alert('Hệ thống đang lỗi, vui lòng thử lại sau!')
      })
  }

  return (
    <Box
      className={classes.root}
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <Link className={classes.btnBack} to="/students">
        <Button startIcon={<ArrowBack />}>
          Quay lại lại trang danh sách sinh viên
        </Button>
      </Link>
      <DialogConfirm
        open={isShowDialogCreate}
        onClose={handleDialogCreateClose}
        onConfirm={handleStudentCreate}
        title="Thêm sinh viên"
        contentText="Bạn có chắc chắn muốn thêm sinh viên này không?"
        btnConfirmLabel="Thêm"
        btnConfirmColor="primary"
      />
      <Typography variant="h6" gutterBottom>
        Thêm mới sinh viên
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(student).map((key, index) => (
          <Grid key={key} item xs={12} md={6}>
            <TextField
              required={
                key === STUDENT_FIELD.studentCode ||
                key === STUDENT_FIELD.fullName
              }
              label={STUDENT_HEAD_ROW[index].label}
              fullWidth
              value={student[key]}
              onChange={(event) =>
                handleStudentChange(event, STUDENT_FIELD[key])
              }
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogCreateOpen}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    margin: '0 auto',
  },
  btnBack: {
    textDecoration: 'none',
  },
}))

export default StudentCreate
