import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './studentSlice'

const rootReducer = {
  student: studentReducer,
}

export const store = configureStore({
  reducer: rootReducer,
})
