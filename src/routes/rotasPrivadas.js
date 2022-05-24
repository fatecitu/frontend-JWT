import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const rotasPrivadas = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("logado") === btoa(process.env.REACT_APP_USER)
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  export default rotasPrivadas