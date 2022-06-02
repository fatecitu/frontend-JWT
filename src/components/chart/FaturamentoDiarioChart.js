import React, { useState, useEffect, useCallback } from 'react'
import { Typography, message, Spin, Skeleton } from 'antd'
import { Column } from '@ant-design/plots'
import { blue, orange } from '@ant-design/colors'

const FaturamentoDiarioChart = () => {
  const { Title, Paragraph } = Typography
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const asyncFetch = useCallback(() => {
    const hoje = new Date()
    const ano = hoje.getFullYear()
    const mes = hoje.getMonth()+1
   setLoading(true)
    fetch(`https://klientagerencial.herokuapp.com/api/pedidosVendidos/resumoFaturamentoDiario?inicio=${ano}-${mes}-01&fim=${ano}-${mes}-31&projeto=Todos`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        message.error(`Não foi possível obter os dados do Faturamento para o gráfico\nMotivo: ${error.message}`)
      })
    setLoading(false)
  },[])

  useEffect(() => {
    asyncFetch();
  }, [asyncFetch]);

  const config = {
    data,
    isStack: true,
    xField: 'dataFaturamento',
    yField: 'total_valor_bruto',
    seriesField: 'projeto',
    color: [orange[2], blue[2], '#FF0000'],
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    label: {
      position: 'middle', // 'top', 'bottom', 'middle',
      style: {
        fill: 'black',
        opacity: 0.6,
        fontSize: 11
      }
    },
    legend: {
      layout: 'horizontal',
      position: 'top'
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.3)',
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Faturamento Bruto dentro do Mês</Title>
          <Paragraph className="lastweek">
            Valores em Reais 
          </Paragraph>
          {loading && <Spin size="large"  tip="Aguarde..."/>}
        </div>
      </div>
      {loading || data.length === 0
        ? <Skeleton />
        : <Column {...config} />
      }
    </>
  )
};

export default FaturamentoDiarioChart




//