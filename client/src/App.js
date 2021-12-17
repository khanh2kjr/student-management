import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { StudentDetail, StudentCreate, StudentList, NotFound } from 'pages'

const App = () => {
  return (
    <Switch>
      <Redirect from="/" to="/students" exact />
      <Route path="/students" component={StudentList} exact />
      <Route path="/students/create" component={StudentCreate} exact />
      <Route path="/students/:studentCode" component={StudentDetail} exact />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
