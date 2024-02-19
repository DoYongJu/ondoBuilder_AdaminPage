import React from 'react';
import {dataProps } from '../../Resources/Models';
import { Chart  } from "react-google-charts";
import dataHandler from '../../Module/DataHubTemplate';
//원형 그래프
const CircleChartUiRender: React.FC<dataProps>=({data})=>{
 
    const options = {
        legend: 'none',
        width:200,
        height: 200,
        pieHole: 0.7,
        pieSliceText: 'none',
        colors: [ '#E8E9EB','#292969', '#284FB5', '#3B97CE', '#74C2E3',],
        
  };
  const contents = dataHandler(data);

  let chartData:any[][] = [['Task', 'Hours per Day']];

  contents.map( (item) => {

    chartData.push([item.name, item.val ]);
  });
  


    return <Chart chartType="PieChart" width={0} height={0} data={chartData} options={options}/>;
};

export default CircleChartUiRender;