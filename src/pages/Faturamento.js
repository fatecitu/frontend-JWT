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

   filters: filterData(dadosFiltro)(i => i.mesInclusao),
      onFilter: (value, record) => record.mesInclusao.indexOf(value) === 0,


const filterData = dadosTabela => formatter => dadosTabela.map( item => ({
  text: formatter(item),
  value: formatter(item)
}))
*/



  const colunas = [
    
    {
      title: 'Nº NF',
      dataIndex: 'nNF',
      key: 'nNF',
      width: 60,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nNF - b.nNF,
      filterSearch: true,
      onFilter: (value, record) => record.nNF.includes(value),
      fixed: 'left'
    },
    {
      title: 'Série',
      dataIndex: 'serie',
      key: 'serie',
      width: 40,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.serie - b.serie,
      filterSearch: true,
      onFilter: (value, record) => record.serie.includes(value)
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: 50,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.tipo - b.tipo,
      filters: [
        {
          text: 'Entrada',
          value: 'Entrada',
        },
        {
          text: 'Saída',
          value: 'Saída',
        },
        {
          text: 'Devolução',
          value: 'Devolução',
        },
      ],
      onFilter: (value, record) => record.tipo.indexOf(value) === 0,
    },
    {
      title: 'Razão Social',
      dataIndex: 'razaoSocial',
      key: 'razaoSocial',
      width: 200,
      render: razaoSocial => razaoSocial.substring(0,40),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.razaoSocial - b.razaoSocial
    },
    {
      title: 'Inclusão',
      dataIndex: 'dataInclusao_db',
      key: 'dataInclusao_db',
      width: 50,
      defaultSortOrder: 'descend',
      render: dataInclusao_db => new Date(dataInclusao_db).toLocaleDateString(),
      sorter: (a, b) => {
        return a.dataInclusao_db.localeCompare(b.dataInclusao_db)
      },
    },
    {
      title: 'Mês Inc.',
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
      title: 'Emissão',
      dataIndex: 'dataEmissao_db',
      key: 'dataEmissao_db',
      width: 50,
      defaultSortOrder: 'descend',
      render: dataEmissao_db => dataEmissao_db ? new Date(dataEmissao_db).toLocaleDateString() : <Tag color="magenta" key={dataEmissao_db}>
        {'A faturar'}
      </Tag>,
      sorter: (a, b) => {
        return a.dataEmissao_db.localeCompare(b.dataEmissao_db)
      },
    },
    {
      title: 'Mês E.',
      dataIndex: 'mesEmissao',
      key: 'mesEmissao',
      render: mesEmissao => mesEmissao!=='' ? mesEmissao : <Tag color="magenta" key={mesEmissao}>A faturar</Tag>,
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
        },        {
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
      onFilter: (value, record) => record.mesEmissao.indexOf(value) === 0,
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto',
      key: 'projeto',
      width: 70,
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
      key: 'departamento',
      width: 70,
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
      width: 100,
      render: valor_liquido => Number(valor_liquido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    },
    {
      title: 'Devolvido',
      dataIndex: 'pedidoDevolvido',
      key: 'pedidoDevolvido',
      render: pedidoDevolvido => pedidoDevolvido === 'S' ? '✔️' : '❎',
      width: 60,
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
      onFilter: (value, record) => record.pedidoDevolvido.indexOf(value) === 0,
    },
    {
      title: 'Dev. Parcial',
      dataIndex: 'pedidoDevolvidoParcial',
      key: 'pedidoDevolvidoParcial',
      render: pedidoDevolvidoParcial => pedidoDevolvidoParcial === 'S' ? '✔️' : '❎',
      width: 64,
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
      onFilter: (value, record) => record.pedidoDevolvidoParcial.indexOf(value) === 0,
    },
    {
      title: 'Cancelado',
      dataIndex: 'pedidoCancelado',
      key: 'pedidoCancelado',
      render: pedidoCancelado => pedidoCancelado === 'S' ? '✔️' : '❎',
      width: 60,
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
      onFilter: (value, record) => record.pedidoCancelado.indexOf(value) === 0,
    },
    {
      title: 'Cat.',
      dataIndex: ['detalheCategoria','descricao'],
      key: 'detalheCategoria.descricao',
      width: 150,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.detalheCategoria.descricao - b.detalheCategoria.descricao
    },
  
  ]

  async function obtemFaturamento() {
    setCarregando(true)
    let res = await getFaturamento()
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
          title="📈 Dados do Faturamento (Notas Fiscais)"
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
        
            <Table
              className="table-striped-rows"
              rowKey={dadosTabela => dadosTabela._id}
              columns={colunas}
              dataSource={dadosTabela}
              onChange={onChange}
              loading={carregando}
              bordered
              size="small"
              /*pagination={{ defaultPageSize: 50 }}*/
              scroll={{
                x: 'max-content',
              }}
            />

        </Card>
      </Col>
    </Row>
   
      </>
  )
}

/* Todo
https://github.com/ant-design/ant-design/blob/f77f02051729cbfd4071fddcfc84bd871da174b7/components/table/demo/custom-filter-panel.md
*/