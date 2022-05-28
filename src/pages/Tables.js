import React, { useState, useEffect } from 'react'
import { Table, message, Typography, Row, Col, Card, Radio } from 'antd'
import { getFaturamento } from '../resources/api/API'
const { Text } = Typography





const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function Faturamento() {
  //Carregando registros na primeira vez
  useEffect(() => {
    obtemFaturamento()
  }, [])


  const [carregando, setCarregando] = useState(false)
  const [dadosTabela, setDadosTabela] = useState([])

  const colunas = [
    {
      title: 'Pedido de Venda',
      dataIndex: 'pv',
      key: 'pv',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.pv - b.pv,
    },
    {
      title: 'Faturamento',
      dataIndex: 'dataFaturamento_db',
      key: 'dataFaturamento_db',
      defaultSortOrder: 'descend',
      render: dataFaturamento_db => new Date(dataFaturamento_db).toLocaleDateString(),
      sorter: (a, b) => { 
        return a.dataFaturamento_db.localeCompare(b.dataFaturamento_db)
      },
    },
    {
      title: 'Projeto',
      dataIndex: 'projeto',
      key: 'projeto',
      width: 50,
      render(text, record) {
        return {
          props: {
            style: { background: text ==='Não definido' ? '#ffccc7' : '' }
          },
          children: <div>{text}</div>
        };
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
      title: () => {
        var totalBruto = 0;
        for (var i = 0; i < dadosTabela.length; i++) {
          totalBruto += dadosTabela[i].valor_bruto;
        }
        return (
          <div>
            Valor Bruto <br /><span style={{color: "#096dd9"}}>R$ {Number((totalBruto).toFixed(2)).toLocaleString()}</span>
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
        for (var i = 0; i < dadosTabela.length; i++) {
          totalLiquido += dadosTabela[i].valor_liquido;
        }
        return (
          <div>
            Valor Líquido <br /><span style={{color: "#096dd9"}}>R$ {Number((totalLiquido).toFixed(2)).toLocaleString()}</span>
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
            title="Dados das Vendas / Faturamento"
            extra={
              <>
                <Radio.Group onChange={onChange} defaultValue="F">
                  <Radio.Button value="F">Faturamento</Radio.Button>
                  <Radio.Button value="V">Venda</Radio.Button>
                </Radio.Group>
              </>
            }
          >
            <div className="table-responsive">
              <Table
                columns={colunas}
                dataSource={dadosTabela}
                onChange={onChange}
                loading={carregando}
                bordered
                scroll={{ x: 1500 }}
                summary={pageData => {
                  let totalBruto = 0;
                  let totalLiquido = 0;

                  pageData.forEach(({ valor_bruto, valor_liquido }) => {
                    totalBruto += valor_bruto;
                    totalLiquido += valor_liquido;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <Text type="info">{totalBruto}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <Text>{totalLiquido}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={2}>
                          <Text type="danger">{totalBruto - totalLiquido}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
  )
}

