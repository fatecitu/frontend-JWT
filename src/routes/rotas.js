import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/SignIn'
import Inicio from '../pages/Home'
import RotasPrivadas from './rotasPrivadas'
import Main from '../components/layout/Main'


export default function Rotas() {
  return (
    <HashRouter>
      <Switch>
      <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Main>
          <RotasPrivadas exact path='/dashboard' component={Inicio} />
        </Main>
      </Switch>
    </HashRouter>
  )
}