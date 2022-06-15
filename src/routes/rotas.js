import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../pages/SignIn'
import Inicio from '../pages/Home'
import Vendas from '../pages/Vendas'
import Faturamento from '../pages/Faturamento'
import FaturamentoServico from '../pages/FaturamentoServico'
import VendasServico from '../pages/VendasServico'
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
          <RotasPrivadas exact path='/vendas' component={Vendas} />
          <RotasPrivadas exact path='/faturamento' component={Faturamento} />
          <RotasPrivadas exact path='/faturamentoservico' component={FaturamentoServico} />
          <RotasPrivadas exact path='/vendasservico' component={VendasServico} />
        </Main>
      </Switch>
    </HashRouter>
  )
}