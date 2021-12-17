import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { studentApi } from 'api'

export const getStudents = createAsyncThunk(
  'students/getStudents',
  async (query) => {
    try {
      const response = await studentApi.getAllStudents(query)
      return response
    } catch (error) {
      console.log('Fetch failed: ', error)
    }
  }
)

const INITIAL_STATE = {
  students: [],
  pagination: {
    limit: 5,
    total: 0,
    page: 1,
  },
  queryParameters: {
    limit: 5,
    page: 1,
  },
  promiseStatus: null,
}

const studentSlice = createSlice({
  name: 'student',
  initialState: INITIAL_STATE,
  reducers: {
    querySuccess(state, action) {
      const queryParameters = action.payload
      state.queryParameters = queryParameters
    },
  },
  extraReducers: {
    [getStudents.pending]: (state) => {
      state.promiseStatus = 'pending'
    },
    [getStudents.fulfilled]: (state, action) => {
      const { data, pagination } = action.payload
      state.students = data
      state.pagination = pagination
      state.promiseStatus = 'fulfilled'
    },
    [getStudents.rejected]: (state) => {
      state.promiseStatus = 'rejected'
    },
  },
})

const { actions, reducer } = studentSlice

export const { querySuccess } = actions

export default reducer
