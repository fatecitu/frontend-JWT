import React, { useState, useEffect } from 'react'
import { Table, message, Row, Col, Card, Button, Tag, Tooltip, Popconfirm } from 'antd'
import { getVendas, getRemovePedido } from '../resources/api/API'
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons'
import { CSVLink } from 'react-csv'


export default function Faturamento() {
  const [carregando, setCarregando] = useState(false)
  const [dadosTabela, setDadosTabela] = useState([])
  const [dadosFiltro, setDadosFiltro] = useState([])

  //Carregando registros na primeira vez
  useEffect(() => {
    obtemVendas()
  }, [])
  // Quando mudar os dados da Tabela, mudamos também os dados do filtro
  useEffect(() => {
    setDadosFiltro(dadosTabela)
  }, [dadosTabela])


  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
    setDadosFiltro(extra.currentDataSource)
  }


const removePedido = async (numeroPV) => {
 message.loading(`Aguarde enquanto o PV ${numeroPV} é excluído`)
 let excluiPV = await getRemovePedido(numeroPV)
 if(excluiPV.errors) {
  message.error(excluiPV.errors[0].msg)
 }
 message.info(`PV ${numeroPV} excluído do Klienta!`)
 obtemVendas()
}

  const colunas = [
    {
      title: '🗑',
      width: 20,
      dataIndex: 'operation',
      fixed: 'left',
      render: (_, record) =>
        dadosFiltro.length >= 1 ? (
          <Popconfirm title="Confirma a exclusão do PV?" onConfirm={() => removePedido(record.pv)}>
            <a title="Excluir o PV do Klienta">🗑</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Nº Pedido',
      dataIndex: 'pv',
      key: 'pv',
      width: 40,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.pv - b.pv,
      filterSearch: true,
      onFilter: (value, record) => record.pv.includes(value),
      fixed: 'left'
    },
    {
      title: 'Inclusão',
      dataIndex: 'dataInclusao_db',
      key: 'dataInclusao_db',
      width: 40,
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
      width: 50,
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
        },
        {
          text: '04/2022',
          value: '04/2022',
        },        
        {
          text: '05/2022',
          value: '05/2022',
        },
        {
          text: '06/2022',
          value: '06/2022',
        },
        {
          text: '07/2022',
          value: '07/2022',
        },
        {
          text: '08/2022',
          value: '08/2022',
        },
        {
          text: '09/2022',
          value: '09/2022',
        },
        {
          text: '10/2022',
          value: '10/2022',
        },
        {
          text: '11/2022',
          value: '11/2022',
        },
        {
          text: '12/2022',
          value: '12/2022',
        }
      ],
      onFilter: (value, record) => record.mesInclusao.indexOf(value) === 0,
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto',
      key: 'pv',
      width: 50,
      render: (projeto) => {
        let color = projeto.length > 10 ? 'orange' : 'geekblue'
        if (projeto === 'Não definido') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={projeto}>
            {projeto}
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
      title: 'Depto',
      dataIndex: 'departamento',
      key: 'pv',
      width: 50,
      render: (departamento) => {
        let color = departamento.length > 10 ? 'orange' : 'geekblue'
        if (departamento === 'Não definido') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={departamento}>
            {departamento}
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
      onFilter: (value, record) => record.departamento.indexOf(value) === 0,
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
      width: 50,
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
      width: 50,
      render: valor_liquido => Number(valor_liquido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
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
      title: 'Excluído',
      dataIndex: 'excluido',
      key: 'excluido',
      render: excluido => excluido === 'S' ? '✔️' : '❎',
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
      onFilter: (value, record) => record.excluido.indexOf(value) === 0,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 40,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.categoria - b.categoria
    },
  ]

  async function obtemVendas() {
    setCarregando(true)
    let res = await getVendas()
    res.ok === 0 ? message.error(`Não foi possível obter a lista do faturamento\nMotivo: ${res.codeName}`) : setDadosTabela(res)
    setCarregando(false)
  }

  return (
    <>
    <Row gutter={[8, 0]}>
      <Col xs="24" xl={24}>
        <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="📈 Dados das Vendas (Pedido de Vendas)"
          extra={
            <>
              <Tooltip placement="topLeft" title="Download dos dados para o Excel/Libre Calc">
                <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ background: "#d46b08", borderColor: "#ffd591" }} disabled={carregando}>
                  <CSVLink
                    data={dadosFiltro}
                    filename='vendas.csv'
                    style={{ "textDecoration": "none", "color": "#fff" }}
                  >
                    Download
                  </CSVLink>
                </Button>
              </Tooltip>
              &nbsp;
              <Tooltip placement="topLeft" title="Recarregar os dados do Omie">
                <Button type="primary" shape="round" icon={<ReloadOutlined />} onClick={() => obtemVendas()}>
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
      </>
  )
}

/* Todo
https://github.com/ant-design/ant-design/blob/f77f02051729cbfd4071fddcfc84bd871da174b7/components/table/demo/custom-filter-panel.md
*/