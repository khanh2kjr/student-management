module.exports = (app, urlApi) => {
  const students = require('../controllers/student.controller.js')

  app.post(urlApi, students.create)

  app.get(urlApi, students.findAll)

  app.get(`${urlApi}/:studentCode`, students.findOne)

  app.put(`${urlApi}/:studentCode`, students.update)

  app.delete(`${urlApi}/:studentCode`, students.delete)

  app.delete(urlApi, students.deleteAll)
}
