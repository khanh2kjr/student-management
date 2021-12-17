import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { studentApi } from 'api'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { STUDENT_HEAD_ROW } from './StudentList'

export const STUDENT_FIELD = {
  studentCode: 'studentCode',
  fullName: 'fullName',
  email: 'email',
  phoneNumber: 'phoneNumber',
}

const StudentDetail = () => {
  const classes = useStyles()
  const history = useHistory()
  const { studentCode } = useParams()

  const [isFetching, setIsFetching] = useState(true)
  const [student, setStudent] = useState({})
  const [editStudent, setEditStudent] = useState({})
  const [isShowDialogDelete, setIsShowDialogDelete] = useState(false)
  const [isShowDialogEdit, setIsShowDialogEdit] = useState(false)

  const handleStudentChange = (event, key) => {
    setStudent({ ...student, [key]: event.target.value })
  }

  const handleDialogDeleteOpen = () => {
    setIsShowDialogDelete(true)
  }

  const handleDialogEditOpen = () => {
    setIsShowDialogEdit(true)
  }

  const handleDialogDeleteClose = () => {
    setIsShowDialogDelete(false)
  }

  const handleDialogEditClose = () => {
    setIsShowDialogEdit(false)
  }

  const handleStudentDelete = () => {
    studentApi
      .deleteStudent(studentCode)
      .then(() => {
        alert(
          `Xoá thành công sinh viên ${student.fullName} có mã sinh viên: ${student.studentCode}`
        )
        history.push('/students')
      })
      .catch(() => {
        alert('Hệ thống đang lỗi, vui lòng thử lại sau!')
      })
  }

  const handleStudentEdit = () => {
    const bodyRequest = { ...student }
    studentApi
      .updateStudent(studentCode, bodyRequest)
      .then(() => {
        alert(`Sửa thành công!`)
      })
      .catch(() => {
        alert('Hệ thống đang lỗi, vui lòng thử lại sau!')
      })
  }

  useEffect(() => {
    const fetchStudentByCode = async () => {
      const studentResponse = await studentApi.getOneStudent(studentCode)

      setStudent(studentResponse)
      setEditStudent(studentResponse)
      setIsFetching(false)
    }

    fetchStudentByCode()
  }, [studentCode])

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
        open={isShowDialogDelete}
        onClose={handleDialogDeleteClose}
        title="Xoá sinh viên"
        contentText={`Bạn có chắc chắn muốn xóa sinh viên ${student.fullName} ra khỏi hệ thống không?`}
        btnConfirmLabel="Xóa"
        btnConfirmColor="secondary"
        onConfirm={handleStudentDelete}
      />
      <DialogConfirm
        open={isShowDialogEdit}
        onClose={handleDialogEditClose}
        onConfirm={handleStudentEdit}
        title="Sửa sinh viên"
        contentText="Bạn có chắc chắn muốn sửa sinh viên này không?"
        btnConfirmLabel="Sửa"
        btnConfirmColor="primary"
      />
      {isFetching ? (
        <Typography align="center">Đang tải...</Typography>
      ) : (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Thông tin sinh viên {editStudent.fullName}
          </Typography>
          <Grid container spacing={3}>
            {Object.keys(student).map((key, index) => (
              <Grid key={key} item xs={12} md={6}>
                <TextField
                  disabled={key === STUDENT_FIELD.studentCode}
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
                className={classes.btnDelete}
                variant="contained"
                color="secondary"
                onClick={handleDialogDeleteOpen}
              >
                Xóa
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDialogEditOpen}
              >
                Sửa
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Box>
  )
}

export const DialogConfirm = ({
  open,
  onClose,
  onConfirm,
  title,
  contentText,
  btnConfirmLabel,
  btnConfirmColor,
  ...otherProps
}) => {
  return (
    <Dialog open={open} onClose={onClose} {...otherProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Hủy
        </Button>
        <Button
          color={btnConfirmColor}
          variant="contained"
          type="submit"
          onClick={() => {
            onClose()
            onConfirm()
          }}
        >
          {btnConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    margin: '0 auto',
  },
  btnDelete: {
    marginRight: theme.spacing(2),
  },
  btnBack: {
    textDecoration: 'none',
  },
}))

export default StudentDetail
