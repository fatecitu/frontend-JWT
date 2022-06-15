import React, { useState, useEffect, useCallback } from 'react'
import { message, Typography, Skeleton, Spin } from 'antd'
import { Line } from '@ant-design/plots'
import { blue, orange } from '@ant-design/colors'

const VendasChart = () => {
  const { Title, Paragraph } = Typography
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  

  const asyncFetch = useCallback(() => {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = hoje.getMonth()

   setLoading(true)
    fetch(`https://klientagerencial.herokuapp.com/api/pedidosVendidos/resumoVendas?inicio=${ano}-01-01&fim=${ano}-${mes}-31&projeto=Todos`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        message.error(`Não foi possível obter os dados das Vendas para o gráfico\nMotivo: ${error.message}`)
      })
    setLoading(false)
  },[])

  useEffect(() => {
    asyncFetch();
  }, [asyncFetch]);


  const config = {
    data,
    xField: 'mesInclusao',
    yField: 'total_valor_bruto',
    seriesField: 'projeto',
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000).toFixed(0)} Mil`,
      },
    },
    legend: {
      position: 'top',
    },
    theme: 'light',
    renderer: 'svg',
    smooth: true,
    color: [orange[5], blue[5], '#FF0000'],
    animation: {
      appear: {
        animation: 'path-in',
        duration: 0,
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Vendas Bruto Anual</Title>
          <Paragraph className="lastweek">
            Valores em Milhares de Reais 
          </Paragraph>
          {loading && <Spin size="large"  tip="Aguarde..."/>}
        </div>
      </div>
      {loading || data.length === 0
        ? <Skeleton />
        : <Line {...config} />
      }
    </>
  )
};

export default VendasChart




//