import {
  Box,
  Button,
  FormControl,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents, querySuccess } from 'app/studentSlice'

const ROW_PER_PAGE = [5, 10, 15, 25]
const DEFAULT_PAGE = 1

const SEARCH_TIME_OUT = 350

export const STUDENT_HEAD_ROW = [
  { id: 1, label: 'Mã sinh viên' },
  { id: 2, label: 'Họ tên' },
  { id: 3, label: 'Email' },
  { id: 4, label: 'Số điện thoại' },
]

const StudentList = () => {
  const classes = useStyles()
  const history = useHistory()
  const typingSearchRef = useRef()
  const dispatch = useDispatch()

  const [students, promiseStatus, pagination, queryParameters] = useSelector(
    ({ student }) => [
      student.students,
      student.promiseStatus,
      student.pagination,
      student.queryParameters,
    ]
  )

  const [nameLike, setNameLike] = useState(queryParameters?.nameLike || '')

  const pageCount = useMemo(() => {
    return Math.ceil(pagination.total / pagination.limit)
  }, [pagination])

  const isFetching = useMemo(() => {
    return promiseStatus === 'pending'
  }, [promiseStatus])

  const handleSearchChange = (event) => {
    const nameLike = event.target.value
    setNameLike(nameLike)

    if (typingSearchRef.current) {
      clearTimeout(typingSearchRef.current)
    }

    typingSearchRef.current = setTimeout(() => {
      dispatch(querySuccess({ ...queryParameters, nameLike }))
      dispatch(
        getStudents({
          ...queryParameters,
          page: DEFAULT_PAGE,
          nameLike: nameLike || null,
        })
      )
    }, SEARCH_TIME_OUT)
  }

  const handleLimitChange = (event) => {
    const limit = event.target.value
    dispatch(querySuccess({ ...queryParameters, limit, page: DEFAULT_PAGE }))
    dispatch(
      getStudents({
        ...queryParameters,
        limit,
        page: DEFAULT_PAGE,
        nameLike: nameLike || null,
      })
    )
  }

  const handlePageChange = (_, page) => {
    if (page === pagination.page) return
    dispatch(querySuccess({ ...queryParameters, page }))
    dispatch(
      getStudents({
        ...queryParameters,
        page,
        nameLike: nameLike || null,
      })
    )
  }

  const handleStudentClick = (studentCode) => {
    history.push('/students/' + studentCode)
  }

  const handleButtonCreateClick = () => {
    history.push('/students/create')
  }

  useEffect(() => {
    dispatch(getStudents(queryParameters))
    return () => {
      clearTimeout(typingSearchRef.current)
    }
  }, [])

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>
        Nguyễn Văn Khánh - Phát triển phần mềm hướng dịch vụ - Quản lý sinh viên
      </Typography>
      <Box className={classes.btnHeaderContainer}>
        <TextField
          className={classes.inputSearch}
          label="Tìm kiếm theo tên"
          variant="outlined"
          value={nameLike}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search />,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonCreateClick}
        >
          Thêm sinh viên
        </Button>
      </Box>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {STUDENT_HEAD_ROW.map((studentRow) => (
              <TableCell key={studentRow.id}>{studentRow.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!isFetching ? (
            students.map((student) => (
              <TableRow
                key={student.studentCode}
                className={classes.tBodyRow}
                onClick={() => handleStudentClick(student.studentCode)}
              >
                <TableCell>{student.studentCode}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography align="center">Đang tải...</Typography>
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isFetching && !students.length ? (
        <Typography align="center">Không có dữ liệu</Typography>
      ) : (
        <Box className={classes.pagination}>
          <FormControl className={classes.rowsPerPage}>
            <Typography>Giới hạn trên một trang</Typography>
            <Select
              value={pagination.limit}
              onChange={handleLimitChange}
              input={<BootstrapInput />}
            >
              {ROW_PER_PAGE.map((limit) => (
                <MenuItem key={limit} value={limit}>
                  {limit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            variant="outlined"
            shape="rounded"
            disabled={pageCount === 1}
            page={pagination.page}
            count={pageCount}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  )
}

export default StudentList

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    margin: '0 auto',
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  btnHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputSearch: {
    width: '600px',
    '& input': {
      paddingLeft: theme.spacing(1),
    },
  },
  table: {
    borderRadius: '4px',
  },
  pagination: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'space-between',
  },
  tBodyRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E8E8E8',
    },
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)
