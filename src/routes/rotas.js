import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from  '../pages/SignIn'
import Inicio from '../pages/Home'
import Tabela from '../pages/Tables'
import NaoEncontrado from '../pages/NaoEncontrado'
import RotasPrivadas from './rotasPrivadas'
import Main from  '../components/layout/Main'


export default function Rotas(){
  return(
<HashRouter>
  <Switch>
  <Route exact path='/login' component={Login} />
      <Main>
    <RotasPrivadas exact path='/home' component={Inicio} />
    <RotasPrivadas exact path='/tabela' component={Tabela} />
    <Route component={NaoEncontrado} />
    </Main>
  </Switch>
</HashRouter>
  )
}