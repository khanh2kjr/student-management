const db = require('./db.js')

const Student = function (student) {
  this.studentCode = student.studentCode
  this.fullName = student.fullName
  this.email = student.email
  this.phoneNumber = student.phoneNumber
}

Student.create = (newStudent, result) => {
  db.query('INSERT INTO students SET ?', newStudent, (err, res) => {
    if (err) {
      result(err, null)
      throw err
    } else {
      result(null, { studentCode: res.studentCode, ...newStudent })
    }
  })
}

Student.findById = (studentCode, result) => {
  db.query(
    `SELECT * FROM students WHERE studentCode = '${studentCode}'`,
    (err, res) => {
      if (err) {
        result(err, null)
        throw err
      } else {
        if (res.length) {
          result(null, res[0])
        } else {
          result({ kind: 'not_found' }, null)
        }
      }
    }
  )
}

Student.getAll = (nameLike, limit, offset, result) => {
  db.query(
    `SELECT * FROM students ${
      nameLike ? `WHERE fullName LIKE '%${nameLike}%'` : ''
    } LIMIT ${limit} OFFSET ${offset}`,
    (err, res) => {
      if (err) {
        result(null, err)
        throw err
      } else {
        db.query(
          `SELECT * FROM students ${
            nameLike ? `WHERE fullName LIKE '%${nameLike}%'` : ''
          }`,
          (err, data) => {
            if (err) {
              result(null, err)
              throw err
            } else {
              result(null, res, data.length)
            }
          }
        )
      }
    }
  )
}

Student.updateByStudentCode = (studentCode, student, result) => {
  db.query(
    'UPDATE students SET fullName = ?, email = ?, phoneNumber = ? WHERE studentCode = ?',
    [student.fullName, student.email, student.phoneNumber, studentCode],
    (err, res) => {
      if (err) {
        result(null, err)
        throw err
      } else {
        if (res.affectedRows == 0) {
          result({ kind: 'not_found' }, null)
        } else {
          result(null, { studentCode: studentCode, ...student })
        }
      }
    }
  )
}

Student.remove = (studentCode, result) => {
  db.query(
    'DELETE FROM students WHERE studentCode = ?',
    studentCode,
    (err, res) => {
      if (err) {
        result(null, err)
        throw err
      } else {
        if (res.affectedRows == 0) {
          result({ kind: 'not_found' }, null)
        } else {
          result(null, res)
        }
      }
    }
  )
}

Student.removeAll = (result) => {
  db.query('DELETE FROM students', (err, res) => {
    if (err) {
      result(null, err)
      throw err
    } else {
      result(null, res)
    }
  })
}

module.exports = Student
