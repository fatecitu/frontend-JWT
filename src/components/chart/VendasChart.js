import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

const VendasChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://klientagerencial.herokuapp.com/api/pedidosVendidos/resumoFaturamento?inicio=2022-01-31&fim=2022-05-31&projeto=Tratamento')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'mesFaturamento',
    yField: 'total_valor_bruto',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  return <Area {...config} />;
};

export default VendasChart
