import React, { useState, useEffect } from 'react'
import { Table, message, Row, Col, Card, Button, Tag, Tooltip } from 'antd'
import { getFaturamento } from '../resources/api/API'
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons'
import { CSVLink } from 'react-csv'


export default function Faturamento() {
  const [carregando, setCarregando] = useState(false)
  const [dadosTabela, setDadosTabela] = useState([])
  const [dadosFiltro, setDadosFiltro] = useState([])

  //Carregando registros na primeira vez
  useEffect(() => {
    obtemFaturamento()
  }, [])
  // Quando mudar os dados da Tabela, mudamos também os dados do filtro
  useEffect(() => {
    setDadosFiltro(dadosTabela)
  }, [dadosTabela])


  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
    setDadosFiltro(extra.currentDataSource)
  }
/*
  const headers = [
    { label: "Id", key: "_id" },
    { label: "PV", key: "pv" },
    { label: "Mês Inclusão", key: "mesInclusao" },
    { label: "Data Inclusão", key: "dataInclusao" }
  ];

  
  const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})
const filtroMes = groupByKey(dadosFiltro, 'mesInclusao')
console.log(filtroMes)
*/

  const colunas = [
    {
      title: 'Pedido de Venda',
      dataIndex: 'pv',
      key: 'pv',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.pv - b.pv,
      filterSearch: true,
      onFilter: (value, record) => record.pv.includes(value),
    },
    {
      title: 'Inclusão',
      dataIndex: 'dataInclusao_db',
      key: 'dataInclusao_db',
      defaultSortOrder: 'descend',
      render: dataInclusao_db => new Date(dataInclusao_db).toLocaleDateString(),
      sorter: (a, b) => {
        return a.dataInclusao_db.localeCompare(b.dataInclusao_db)
      },
    },
    {
      title: 'Mês Inclusão',
      dataIndex: 'mesInclusao',
      key: 'mesInclusao',
      filters: [
        {
          text: '01/2022',
          value: '01/2022',
        },
        {
          text: '02/2022',
          value: '02/2022',
        },
        {
          text: '03/2022',
          value: '03/2022',
        }, {
          text: '04/2022',
          value: '04/2022',
        }, {
          text: '05/2022',
          value: '05/2022',
        }, {
          text: '06/2022',
          value: '06/2022',
        }
      ],
      onFilter: (value, record) => record.mesInclusao.indexOf(value) === 0,
    },
    {
      title: 'Faturamento',
      dataIndex: 'dataFaturamento_db',
      key: 'dataFaturamento_db',
      defaultSortOrder: 'descend',
      render: dataFaturamento_db => dataFaturamento_db ? new Date(dataFaturamento_db).toLocaleDateString() : <Tag color="magenta" key={dataFaturamento_db}>
        {'A faturar'}
      </Tag>,
      sorter: (a, b) => {
        return a.dataFaturamento_db.localeCompare(b.dataFaturamento_db)
      },
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto',
      key: 'pv',
      width: 50,
      render: (projeto) => {
        let color = projeto.length > 10 ? 'geekblue' : 'orange'
        if (projeto === 'Não definido') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={projeto}>
            {projeto.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: 'Semicondutores',
          value: 'Semicondutores',
        },
        {
          text: 'Tratamento',
          value: 'Tratamento',
        },
        {
          text: 'Não Definido',
          value: 'Não definido',
        },
      ],
      onFilter: (value, record) => record.projeto.indexOf(value) === 0,
    },
    {
      title: 'Devolvido',
      dataIndex: 'devolvido',
      key: 'devolvido',
      render: devolvido => devolvido === 'S' ? '✔️' : '❎',
      width: 40,
      filters: [
        {
          text: '✔️Sim',
          value: 'S',
        },
        {
          text: '❎Não',
          value: 'N',
        }
      ],
      onFilter: (value, record) => record.devolvido.indexOf(value) === 0,
    },
    {
      title: 'Dev. Parcial',
      dataIndex: 'devolvido_parcial',
      key: 'devolvido_parcial',
      render: devolvido_parcial => devolvido_parcial === 'S' ? '✔️' : '❎',
      width: 40,
      filters: [
        {
          text: '✔️Sim',
          value: 'S',
        },
        {
          text: '❎Não',
          value: 'N',
        }
      ],
      onFilter: (value, record) => record.devolvido_parcial.indexOf(value) === 0,
    },
    {
      title: 'Cancelado',
      dataIndex: 'cancelado',
      key: 'cancelado',
      render: cancelado => cancelado === 'S' ? '✔️' : '❎',
      width: 40,
      filters: [
        {
          text: '✔️Sim',
          value: 'S',
        },
        {
          text: '❎Não',
          value: 'N',
        }
      ],
      onFilter: (value, record) => record.cancelado.indexOf(value) === 0,
    },
    {
      title: () => {
        var totalBruto = 0;
        for (var i = 0; i < dadosFiltro.length; i++) {
          totalBruto += dadosFiltro[i].valor_bruto;
        }
        return (
          <div>
            Valor Bruto <br /><span style={{ color: "#fefefe" }}><strong>R$ {Number((totalBruto).toFixed(2)).toLocaleString()}</strong></span>
          </div>
        );
      },
      dataIndex: "valor_bruto",
      align: 'right',
      width: 100,
      render: valor_bruto => Number(valor_bruto).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    },
    {
      title: () => {
        var totalLiquido = 0;
        for (var i = 0; i < dadosFiltro.length; i++) {
          totalLiquido += dadosFiltro[i].valor_liquido;
        }
        return (
          <div>
            Valor Líquido <br /><span style={{ color: "#fefefe" }}><strong>R$ {Number((totalLiquido).toFixed(2)).toLocaleString()}</strong></span>
          </div>
        );
      },
      dataIndex: "valor_liquido",
      align: 'right',
      width: 100
    }
  ]

  async function obtemFaturamento() {
    setCarregando(true)
    let res = await getFaturamento()
    res.ok === 0 ? message.error(`Não foi possível obter a lista do faturamento\nMotivo: ${res.codeName}`) : setDadosTabela(res)
    setCarregando(false)
  }

  return (
    <Row gutter={[8, 0]}>
      <Col xs="24" xl={24}>
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="📈 Dados das Vendas / Faturamento"
          extra={
            <>
              <Tooltip placement="topLeft" title="Download dos dados para o Excel/Libre Calc">
                <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ background: "#d46b08", borderColor: "#ffd591" }} disabled={carregando}>
                  <CSVLink
                    data={dadosFiltro}
                    filename='pedidosCorona.csv'
                    style={{ "textDecoration": "none", "color": "#fff" }}
                  >
                    Download
                  </CSVLink>
                </Button>
              </Tooltip>
              &nbsp;
              <Tooltip placement="topLeft" title="Recarregar os dados do Omie">
                <Button type="primary" shape="round" icon={<ReloadOutlined />} onClick={() => obtemFaturamento()}>
                  Recarregar
                </Button>
              </Tooltip>
            </>
          }
        >
          <div className="table-responsive">
            <Table
              className="table-striped-rows"
              rowKey={dadosTabela => dadosTabela._id}
              columns={colunas}
              dataSource={dadosTabela}
              onChange={onChange}
              loading={carregando}
              bordered
              size="small"
              pagination={{ defaultPageSize: 50 }}
              scroll={{ x: 1500 }}
            />
          </div>
        </Card>
      </Col>
    </Row>
  )
}

/* Todo
https://mdpuneethreddy.medium.com/antd-table-export-to-csv-pdf-reactjs-typescript-fcd10addf223
*/