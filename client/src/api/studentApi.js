import httpRequest from './http.request'

const studentApi = {
  getAllStudents(params) {
    const url = '/students'
    return httpRequest.get(url, { params })
  },
  getOneStudent(studentCode) {
    const url = `/students/${studentCode}`
    return httpRequest.get(url)
  },
  createStudent(data) {
    const url = '/students'
    return httpRequest.post(url, { data })
  },
  updateStudent(studentCode, data) {
    const url = `/students/${studentCode}`
    return httpRequest.put(url, { data })
  },
  deleteStudent(studentCode) {
    const url = `/students/${studentCode}`
    return httpRequest.delete(url)
  },
}

export default studentApi
  