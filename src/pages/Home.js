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
  Statistic
} from "antd"
import { blue, orange } from '@ant-design/colors'
import {
  RightOutlined
} from "@ant-design/icons"

import { getDashboardVendas, getDashboardFaturamento } from '../resources/api/API'

import FaturamentoChart from "../components/chart/FaturamentoChart"
import FaturamentoDiarioChart from "../components/chart/FaturamentoDiarioChart"

function Home() {
  const { Title } = Typography
  //Controle das Vendas
  const [carregaSemiVendasMes, setCarregaSemiVendasMes] = useState(false)
  const [carregaSemiVendasDia, setCarregaSemiVendasDia] = useState(false)
  const [carregaTratVendasMes, setCarregaTratVendasMes] = useState(false)
  const [carregaTratVendasDia, setCarregaTratVendasDia] = useState(false)
  const [semiVendasMes, setSemiVendasMes] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [semiVendasDia, setSemiVendasDia] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [tratVendasMes, setTratVendasMes] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [tratVendasDia, setTratVendasDia] = useState([{total_valor_bruto:0, total_valor_liquido:0}])

  //Controle do Faturamento
  const [carregaSemiFaturamentoMes, setCarregaSemiFaturamentoMes] = useState(false)
  const [carregaSemiFaturamentoDia, setCarregaSemiFaturamentoDia] = useState(false)
  const [carregaTratFaturamentoMes, setCarregaTratFaturamentoMes] = useState(false)
  const [carregaTratFaturamentoDia, setCarregaTratFaturamentoDia] = useState(false)
  const [semiFaturamentoMes, setSemiFaturamentoMes] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [semiFaturamentoDia, setSemiFaturamentoDia] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [tratFaturamentoMes, setTratFaturamentoMes] = useState([{total_valor_bruto:0, total_valor_liquido:0}])
  const [tratFaturamentoDia, setTratFaturamentoDia] = useState([{total_valor_bruto:0, total_valor_liquido:0}])

  //Carregando registros na primeira vez
  async function obtemDadosDashboard() {
    //Definindo automaticamente o dia de hoje, primeiro dia do mês e último dia do mês
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const primeiro = primeiroDia.toISOString().split('T')[0]
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    const ultimo = ultimoDia.toISOString().split('T')[0]
    const dia = hoje.toISOString().split('T')[0]
    
    setCarregaSemiVendasMes(true)
    let resSemiVendaMes = await getDashboardVendas(primeiro, ultimo, 'Semicondutores')
    resSemiVendaMes.ok === 0 ? message.error(`Não foi possível obter as Vendas Mensais do Semicondutores\nMotivo: ${resSemiVendaMes.codeName}`) : setSemiVendasMes(resSemiVendaMes)
     setCarregaSemiVendasMes(false)

    setCarregaSemiVendasDia(true)
    let resSemiVendaDia = await getDashboardVendas(dia, dia, 'Semicondutores')
    resSemiVendaDia.ok === 0 ? message.error(`Não foi possível obter as Vendas Diárias do Semicondutores\nMotivo: ${resSemiVendaDia.codeName}`) : setSemiVendasDia(resSemiVendaDia)
    setCarregaSemiVendasDia(false)

    setCarregaTratVendasMes(true)
    let resTratVendaMes = await getDashboardVendas(primeiro, ultimo, 'Tratamento')
    resTratVendaMes.ok === 0 ? message.error(`Não foi possível obter as Vendas Mensais do Tratamento\nMotivo: ${resTratVendaMes.codeName}`) : setTratVendasMes(resTratVendaMes)
    setCarregaTratVendasMes(false)

    setCarregaTratVendasDia(true)
    let resTratVendaDia = await getDashboardVendas(dia, dia, 'Tratamento')
    resTratVendaDia.ok === 0 ? message.error(`Não foi possível obter as Vendas Diárias do Tratamento\nMotivo: ${resTratVendaDia.codeName}`) : setTratVendasDia(resTratVendaDia)
    setCarregaTratVendasDia(false)

    setCarregaSemiFaturamentoMes(true)
    let resSemiFaturamentoMes = await getDashboardFaturamento(primeiro, ultimo, 'Semicondutores')
    resSemiFaturamentoMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal do Semicondutores\nMotivo: ${resSemiFaturamentoMes.codeName}`) : setSemiFaturamentoMes(resSemiFaturamentoMes)
    setCarregaSemiFaturamentoMes(false)

    setCarregaSemiFaturamentoDia(true)
    let resSemiFaturamentoDia = await getDashboardFaturamento(dia, dia, 'Semicondutores')
    resSemiFaturamentoDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Semicondutores\nMotivo: ${resSemiFaturamentoDia.codeName}`) : setSemiFaturamentoDia(resSemiFaturamentoDia)
    setCarregaSemiFaturamentoDia(false)

    setCarregaTratFaturamentoMes(true)
    let resTratFaturamentoMes = await getDashboardFaturamento(primeiro, ultimo, 'Tratamento')
    resTratFaturamentoMes.ok === 0 ? message.error(`Não foi possível obter o Faturamento Mensal do Tratamento\nMotivo: ${resTratFaturamentoMes.codeName}`) : setTratFaturamentoMes(resTratFaturamentoMes)
    setCarregaTratFaturamentoMes(false)

    setCarregaTratFaturamentoDia(true)
    let resTratFaturamentoDia = await getDashboardFaturamento(dia, dia, 'Tratamento')
    resTratFaturamentoDia.ok === 0 ? message.error(`Não foi possível obter o Faturamento Diário do Tratamento\nMotivo: ${resTratFaturamentoDia.codeName}`) : setTratFaturamentoDia(resTratFaturamentoDia)
    setCarregaTratFaturamentoDia(false)
  }

  useEffect(() => {
    obtemDadosDashboard()
  }, [])



  return (
    <>
      <div className="layout-content">

        <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: blue[5] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: blue[2] }}>
                    Faturamento Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratFaturamentoMes}>
                    <Statistic
                      title="Bruto"
                      value={typeof tratFaturamentoMes[0] === "undefined" ? 0 : tratFaturamentoMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof tratFaturamentoMes[0] === "undefined" ? 0 : tratFaturamentoMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Bruto"
                      value={typeof tratFaturamentoDia[0] === "undefined" ? 0 : tratFaturamentoDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof tratFaturamentoDia[0] === "undefined" ? 0 : tratFaturamentoDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratFaturamentoDia}
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
                  <Title level={4} style={{ color: blue[8] }}>
                    Vendas Tratamento
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaTratVendasMes}>
                    <Statistic
                      title="Bruto"
                      value={typeof tratVendasMes[0] === "undefined" ? 0 : tratVendasMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof tratVendasMes[0] === "undefined" ? 0 : tratVendasMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Bruto"
                      value={typeof tratVendasDia[0] === "undefined" ? 0 : tratVendasDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof tratVendasDia[0] === "undefined" ? 0 : tratVendasDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
                      groupSeparator='.'
                      decimalSeparator=','
                      valueStyle={{ color: blue[8] }}
                      loading={carregaTratVendasDia}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
       {/* </Row>

  <Row gutter={[24, 0]}>*/}
        <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[5] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[2] }}>
                    Faturamento Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiFaturamentoMes}>

                    <Statistic
                      title="Bruto"
                      value={typeof semiFaturamentoMes[0] === "undefined" ? 0 : semiFaturamentoMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof semiFaturamentoMes[0] === "undefined" ? 0 : semiFaturamentoMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Bruto"
                      value={typeof semiFaturamentoDia[0] === "undefined" ? 0 : semiFaturamentoDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof semiFaturamentoDia[0] === "undefined" ? 0 : semiFaturamentoDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
            <Card bordered={false} className="criclebox h-full" style={{ background: orange[2] }}>
              <Row gutter={8}>
                <Col span={24}>
                  <Title level={4} style={{ color: orange[8] }}>
                    Vendas Semicondutores
                  </Title>
                  <Title level={5}>Mês</Title>
                </Col>
                <Col span={12}>
                  <Card loading={carregaSemiVendasMes}>

                    <Statistic
                      title="Bruto"
                      value={typeof semiVendasMes[0] === "undefined" ? 0 : semiVendasMes[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof semiVendasMes[0] === "undefined" ? 0 : semiVendasMes[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Bruto"
                      value={typeof semiVendasDia[0] === "undefined" ? 0 : semiVendasDia[0].total_valor_bruto}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
                      title="Líquido"
                      value={typeof semiVendasDia[0] === "undefined" ? 0 : semiVendasDia[0].total_valor_liquido}
                      precision={window.screen.width >= 1280 ? 2 : 0}
                      prefix={window.screen.width >= 1280 ? 'R$' : ''}
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
        </Row>


        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <FaturamentoChart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <FaturamentoDiarioChart />
            </Card>
          </Col>
        </Row>

       

        <Row gutter={[24, 0]}>
          {/*
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Built by developers</Text>
                      <Title level={5}>Klienta Gerencial</Title>
                      <Paragraph className="lastweek mb-36">
                        From colors, cards, typography to complex elements, you
                        will find the full documentation.
                      </Paragraph>
                    </div>
                    <div className="card-footer">
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}
                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
  */}
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

