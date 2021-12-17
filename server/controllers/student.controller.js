const Student = require('../models/student.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Vui lòng nhập đủ thông tin',
    })
  }

  const student = new Student({ ...req.body.data })

  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        success: false,
      })
    else {
      res.send({
        success: true,
      })
    }
  })
}

exports.findAll = (req, res) => {
  const queryParams = req.query
  const limit = Number(queryParams.limit) || 5
  const page = Number(queryParams.page) || 1
  const offset = (page - 1) * limit
  const nameLike = req.query.nameLike

  Student.getAll(nameLike, limit, offset, (err, data, total) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      })
    } else {
      res.send({
        data,
        pagination: {
          limit,
          page,
          total,
        },
      })
    }
  })
}

exports.findOne = (req, res) => {
  Student.findById(req.params.studentCode, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Không tìm thấy`,
        })
      } else {
        res.status(500).send({
          message: 'Lỗi server',
        })
      }
    } else {
      res.send(data)
    }
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Vui lòng nhập đủ thông tin',
    })
  }

  Student.updateByStudentCode(
    req.params.studentCode,
    new Student(req.body.data),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Không tìm thấy sinh viên này`,
          })
        } else {
          res.status(500).send({
            success: false,
          })
        }
      } else {
        res.send({ success: true })
      }
    }
  )
}

exports.delete = (req, res) => {
  Student.remove(req.params.studentCode, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Không tìm thấy sinh viên này`,
        })
      } else {
        res.status(500).send({
          success: false,
        })
      }
    } else {
      res.send({ success: true })
    }
  })
}

exports.deleteAll = (_, res) => {
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message,
      })
    else {
      res.send({ message: `All Students were deleted successfully!` })
    }
  })
}
