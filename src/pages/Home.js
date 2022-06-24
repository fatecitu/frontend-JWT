/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState, useEffect } from "react"

import {
  Card,
  Col,
  Row,
  Typography,
  message,
  Statistic,
  Button
} from "antd"
import { blue, orange } from '@ant-design/colors'
import {
  RightOutlined, ReloadOutlined
} from "@ant-design/icons"

import { getDashboardVendas, getDashboardFaturamento, getDashboardVendasServico, getDashboardFaturamentoServico } from '../resources/api/API'

import FaturamentoChart from "../components/chart/FaturamentoChart"
import VendasChart from "../components/chart/VendasChart"

function Home() {
  const { Title } = Typography
  //Controle das Vendas
  const [carregaSemiVendasMes, setCarregaSemiVendasMes] = useState(false)
  const [carregaSemiVendasDia, setCarregaSemiVendasDia] = useState(false)
  const [carregaTratVendasMes, setCarregaTratVendasMes] = useState(false)
  const [carregaTratVendasDia, setCarregaTratVendasDia] = useState(false)
  const [semiVendasMes, setSemiVendasMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [semiVendasDia, setSemiVendasDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratVendasMes, setTratVendasMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratVendasDia, setTratVendasDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])

  //Controle do Faturamento
  const [carregaSemiFaturamentoMes, setCarregaSemiFaturamentoMes] = useState(false)
  const [carregaSemiFaturamentoDia, setCarregaSemiFaturamentoDia] = useState(false)
  const [carregaTratFaturamentoMes, setCarregaTratFaturamentoMes] = useState(false)
  const [carregaTratFaturamentoDia, setCarregaTratFaturamentoDia] = useState(false)
  const [semiFaturamentoMes, setSemiFaturamentoMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [semiFaturamentoDia, setSemiFaturamentoDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratFaturamentoMes, setTratFaturamentoMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratFaturamentoDia, setTratFaturamentoDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])


  //Controle do Faturamento do Serviço
  const [carregaSemiFaturamentoServMes, setCarregaSemiFaturamentoServMes] = useState(false)
  const [carregaSemiFaturamentoServDia, setCarregaSemiFaturamentoServDia] = useState(false)
  const [carregaTratFaturamentoServMes, setCarregaTratFaturamentoServMes] = useState(false)
  const [carregaTratFaturamentoServDia, setCarregaTratFaturamentoServDia] = useState(false)
  const [semiFaturamentoServMes, setSemiFaturamentoServMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [semiFaturamentoServDia, setSemiFaturamentoServDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratFaturamentoServMes, setTratFaturamentoServMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratFaturamentoServDia, setTratFaturamentoServDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])

  //Controle das Vendas do Serviço
  const [carregaSemiVendasServMes, setCarregaSemiVendasServMes] = useState(false)
  const [carregaSemiVendasServDia, setCarregaSemiVendasServDia] = useState(false)
  const [carregaTratVendasServMes, setCarregaTratVendasServMes] = useState(false)
  const [carregaTratVendasServDia, setCarregaTratVendasServDia] = useState(false)
  const [semiVendasServMes, setSemiVendasServMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [semiVendasServDia, setSemiVendasServDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratVendasServMes, setTratVendasServMes] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])
  const [tratVendasServDia, setTratVendasServDia] = useState([{ total_valor_bruto: 0, total_valor_liquido: 0 }])

  //Carregando registros na primeira vez
  async function obtemDadosDashboard() {
    //Definindo automaticamente o dia de hoje, primeiro dia do mês e último dia do mês
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const primeiro = primeiroDia.toISOString().split('T')[0]
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    const ultimo = ultimoDia.toISOString().split('T')[0]
    const dia = hoje.toISOString().split('T')[0]

    /* Vendas */
    setCarregaSemiVendasMes(true)
    setCarregaSemiVendasDia(true)
    setCarregaTratVendasMes(true)
    setCarregaTratVendasDia(true)
    setCarregaSemiFaturamentoMes(true)
    setCarregaSemiFaturamentoDia(true)
    setCarregaTratFaturamentoMes(true)
    setCarregaTratFaturamentoDia(true)
    setCarregaSemiFaturamentoServMes(true)
    setCarregaSemiFaturamentoServDia(true)
    setCarregaTratFaturamentoServMes(true)
    setCarregaTratFaturamentoServDia(true)
    setCarregaSemiVendasServMes(true)
    setCarregaSemiVendasServDia(true)
    setCarregaTratVendasServMes(true)
    setCarregaTratVendasServDia(true)

    let resSemiVendaMes = await getDashboardVendas(primeiro, ultimo, 'Semicondutores')
    resSemiVendaMes.ok === 0 ? message.error(`Não foi possível obter as Vendas Mensais do Semicondutores\nMotivo: ${resSemiVendaMes.codeName}`) : setSemiVendasMes(resSemiVendaMes)
    setCarregaSemiVendasMes(false)
  
    let resSemiVendaDia = await getDashboardVendas(dia, dia, 'Semicondutores')
    resSemiVendaDia.ok === 0 ? message.error(`Não foi possível obter as Vendas Diárias do Semicondutores\nMotivo: ${resSemiVendaDia.codeName}`) : setSemiVendasDia(resSemiVendaDia)
    setCarregaSemiVendasDia(false)

    let resTratVendaMes = await getDashboardVendas(primeiro, ultimo, 'Tratamento')
    resTratVendaMes.ok === 0 ? message.error(`Não foi possível obter as Vendas Mensais do Tratamento\nMotivo: ${resTratVendaMes.codeName}`) : setTratVendasMes(resTratVendaMes)
    setCarregaTratVendasMes(false)
    
    let resTratVendaDia = await getDashboardVendas(dia, dia, 'Tratamento')
    resTratVendaDia.ok === 0 ? message.error(`Não foi possível obter as Vendas Diárias do Tratamento\nMotivo: ${resTratVendaDia.codeName}`) : setTratVendasDia(resTratVendaDia)
    setCarregaTratVendasDia(false)

    /* Faturamento */
    let resSemiFaturamentoMes = await getDashboardFaturamento(primeiro, ultimo, 'Semicondutores')
    resSemiFaturamentoMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal do Semicondutores\nMotivo: ${resSemiFaturamentoMes.codeName}`) : setSemiFaturamentoMes(resSemiFaturamentoMes)
    setCarregaSemiFaturamentoMes(false)

    let resSemiFaturamentoDia = await getDashboardFaturamento(dia, dia, 'Semicondutores')
    resSemiFaturamentoDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Semicondutores\nMotivo: ${resSemiFaturamentoDia.codeName}`) : setSemiFaturamentoDia(resSemiFaturamentoDia)
    setCarregaSemiFaturamentoDia(false)
    
    let resTratFaturamentoMes = await getDashboardFaturamento(primeiro, ultimo, 'Tratamento')
    resTratFaturamentoMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal do Tratamento\nMotivo: ${resTratFaturamentoMes.codeName}`) : setTratFaturamentoMes(resTratFaturamentoMes)
    setCarregaTratFaturamentoMes(false)

    let resTratFaturamentoDia = await getDashboardFaturamento(dia, dia, 'Tratamento')
    resTratFaturamentoDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Tratamento\nMotivo: ${resTratFaturamentoDia.codeName}`) : setTratFaturamentoDia(resTratFaturamentoDia)
    setCarregaTratFaturamentoDia(false)

    /* Faturamento Serviço */
    let resSemiFaturamentoServMes = await getDashboardFaturamentoServico(primeiro, ultimo, 'Semicondutores')
    resSemiFaturamentoServMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal de Serviço do Semicondutores\nMotivo: ${resSemiFaturamentoServMes.codeName}`) : setSemiFaturamentoServMes(resSemiFaturamentoServMes)
    setCarregaSemiFaturamentoServMes(false)

    let resSemiFaturamentoServDia = await getDashboardFaturamentoServico(dia, dia, 'Semicondutores')
    resSemiFaturamentoServDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário de Serviço do Semicondutores\nMotivo: ${resSemiFaturamentoServDia.codeName}`) : setSemiFaturamentoServDia(resSemiFaturamentoServDia)
    setCarregaSemiFaturamentoServDia(false)

    let resTratFaturamentoServMes = await getDashboardFaturamentoServico(primeiro, ultimo, 'Tratamento')
    resTratFaturamentoServMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal de Serviço do Tratamento\nMotivo: ${resTratFaturamentoServMes.codeName}`) : setTratFaturamentoServMes(resTratFaturamentoServMes)
    setCarregaTratFaturamentoServMes(false)

    let resTratFaturamentoServDia = await getDashboardFaturamentoServico(dia, dia, 'Tratamento')
    resTratFaturamentoServDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Tratamento\nMotivo: ${resTratFaturamentoServDia.codeName}`) : setTratFaturamentoServDia(resTratFaturamentoServDia)
    setCarregaTratFaturamentoServDia(false)

    /* Vendas Serviço */
    let resSemiVendasServMes = await getDashboardVendasServico(primeiro, ultimo, 'Semicondutores')
    resSemiVendasServMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal de Serviço do Semicondutores\nMotivo: ${resSemiVendasServMes.codeName}`) : setSemiVendasServMes(resSemiVendasServMes)
    setCarregaSemiVendasServMes(false)
    
    let resSemiVendasServDia = await getDashboardVendasServico(dia, dia, 'Semicondutores')
    resSemiVendasServDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário de Serviço do Semicondutores\nMotivo: ${resSemiVendasServDia.codeName}`) : setSemiVendasServDia(resSemiVendasServDia)
    setCarregaSemiVendasServDia(false)

    let resTratVendasServMes = await getDashboardVendasServico(primeiro, ultimo, 'Tratamento')
    resTratVendasServMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal de Serviço do Tratamento\nMotivo: ${resTratVendasServMes.codeName}`) : setTratVendasServMes(resTratVendasServMes)
    setCarregaTratVendasServMes(false)

    let resTratVendasServDia = await getDashboardVendasServico(dia, dia, 'Tratamento')
    resTratVendasServDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Tratamento\nMotivo: ${resTratVendasServDia.codeName}`) : setTratVendasServDia(resTratVendasServDia)
    setCarregaTratVendasServDia(false)
  }

  useEffect(() => {
    obtemDadosDashboard()
  }, [])



  return (
    <>
      <div className="layout-content">
        <Button
          type="link"
          onClick={() => obtemDadosDashboard()}
        >
          <ReloadOutlined /> Atualizar
        </Button>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[7] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[2] }}>
                  📦Faturamento Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratFaturamentoMes[0] === "undefined" ? 0 : tratFaturamentoMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratFaturamentoMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratFaturamentoMes[0] === "undefined" ? 0 : tratFaturamentoMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratFaturamentoMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratFaturamentoDia[0] === "undefined" ? 0 : tratFaturamentoDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratFaturamentoDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratFaturamentoDia[0] === "undefined" ? 0 : tratFaturamentoDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratFaturamentoDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[5] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[8] }}>
                  📦 Vendas Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratVendasMes[0] === "undefined" ? 0 : tratVendasMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratVendasMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratVendasMes[0] === "undefined" ? 0 : tratVendasMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratVendasMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratVendasDia[0] === "undefined" ? 0 : tratVendasDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratVendasDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratVendasDia[0] === "undefined" ? 0 : tratVendasDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratVendasDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[3] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[7] }}>
                  🛠️ Fat. Serviço Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoServMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratFaturamentoServMes[0] === "undefined" ? 0 : tratFaturamentoServMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratFaturamentoServMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoServMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratFaturamentoServMes[0] === "undefined" ? 0 : tratFaturamentoServMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratFaturamentoServMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoServDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratFaturamentoServDia[0] === "undefined" ? 0 : tratFaturamentoServDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratFaturamentoServDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoServDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratFaturamentoServDia[0] === "undefined" ? 0 : tratFaturamentoServDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratFaturamentoServDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[2] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[7] }}>
                  🛠️ Vendas Serviço Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasServMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratVendasServMes[0] === "undefined" ? 0 : tratVendasServMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratVendasServMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasServMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratVendasServMes[0] === "undefined" ? 0 : tratVendasServMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratVendasServMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasServDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof tratVendasServDia[0] === "undefined" ? 0 : tratVendasServDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratVendasServDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasServDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof tratVendasServDia[0] === "undefined" ? 0 : tratVendasServDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[5] }}
                      loading={carregaTratVendasServDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* </Row>

  <Row gutter={[24, 0]}>*/}
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[8] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[2] }}>
                  📦 Faturamento Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoMes}>

                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiFaturamentoMes[0] === "undefined" ? 0 : semiFaturamentoMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiFaturamentoMes}
                    />

                    {/*semiFaturamentoMes[0].total_valor_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) */}
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiFaturamentoMes[0] === "undefined" ? 0 : semiFaturamentoMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      loading={carregaSemiFaturamentoMes}
                      valueStyle={{ color: orange[5] }}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiFaturamentoDia[0] === "undefined" ? 0 : semiFaturamentoDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiFaturamentoDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiFaturamentoDia[0] === "undefined" ? 0 : semiFaturamentoDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiFaturamentoDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[5] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[8] }}>
                  📦 Vendas Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasMes}>

                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiVendasMes[0] === "undefined" ? 0 : semiVendasMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiVendasMes}
                    />

                    {/*semiVendasMes[0].total_valor_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) */}
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiVendasMes[0] === "undefined" ? 0 : semiVendasMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      loading={carregaSemiVendasMes}
                      valueStyle={{ color: orange[5] }}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiVendasDia[0] === "undefined" ? 0 : semiVendasDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiVendasDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiVendasDia[0] === "undefined" ? 0 : semiVendasDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiVendasDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[4] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[7] }}>
                  🛠️ Fat. Serviço Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoServMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiFaturamentoServMes[0] === "undefined" ? 0 : semiFaturamentoServMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiFaturamentoServMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoServMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiFaturamentoServMes[0] === "undefined" ? 0 : semiFaturamentoServMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiFaturamentoServMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoServDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiFaturamentoServDia[0] === "undefined" ? 0 : semiFaturamentoServDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiFaturamentoServDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoServDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiFaturamentoServDia[0] === "undefined" ? 0 : semiFaturamentoServDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiFaturamentoServDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[2] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[7] }}>
                  🛠️ Vendas Serviço Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasServMes}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiVendasServMes[0] === "undefined" ? 0 : semiVendasServMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiVendasServMes}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasServMes}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiVendasServMes[0] === "undefined" ? 0 : semiVendasServMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiVendasServMes}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={5}>Dia</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasServDia}>
                    <Statistic
                      title="Bruto (R$)"
                      value={typeof semiVendasServDia[0] === "undefined" ? 0 : semiVendasServDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[8] }}
                      loading={carregaSemiVendasServDia}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasServDia}>
                    <Statistic
                      title="Líquido (R$)"
                      value={typeof semiVendasServDia[0] === "undefined" ? 0 : semiVendasServDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1367 ? 2 : 0}
                      
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: orange[5] }}
                      loading={carregaSemiVendasServDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <FaturamentoChart />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <VendasChart />
              </Card>
            </Col>
          </Row>}



        <Row gutter={[24, 0]}>

          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox card-info-2 h-full">
              <div className="gradent h-full col-content">
                <div className="card-content">
                  <Title level={5}>100% Integrado ao ERP Omie</Title>
                  <p>
                    O <strong>Klienta Gerencial</strong> está integrado ao ERP Omie, porém as atualizações para uma melhor performance, são realizadas de hora em hora.
                  </p>
                </div>
                <div className="card-footer">
                  <a className="icon-move-right" href="https://app.omie.com.br/login/" target="_blank" rel="noreferrer">
                    Acessar o Omie
                    <RightOutlined />
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;

