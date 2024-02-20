import React from 'react';
import { dataProps } from '../../Resources/Models';
import { Chart  } from "react-google-charts";
import dataHandler from '../../Module/DataHandler';

// 바 그래프
const stickChartUiRender: React.FC<dataProps>=({data})=>{

    var options = {
      height: 45,
      width:430,
      legend: { position: 'none'},
      isStacked: true,
      colors: ['#E8E9EB','#292969', '#284FB5', '#3B97CE', '#74C2E3'],

      vAxis: {
        baselineColor: 'transparent',
        textPosition: 'none', // y 축 레이블 숨기기
        gridlines: {
            color: 'transparent', // 수평 눈금선 색상을 투명으로 설정
          },
      },
      hAxis: {
        baselineColor: 'transparent',
        textPosition: 'none', // x 축 레이블 숨기기
        gridlines: {
            color: 'transparent', // 수평 눈금선 색상을 투명으로 설정
          },
      },
      
    };

    const contents =  dataHandler(data);

    let chartData: any[][] =[['Fantasy & Sci F'],[0]];

    contents.map((item) => {
      let name = item.name;
      let val = item.val;
      
      chartData[0].push(name);
      chartData[1].push(val);
    
    });

    chartData[0].push({ role: 'annotation' });
    chartData[1].push('');


  return  <Chart width={'100%'} height='100%' chartType="BarChart" data={chartData} options={options}/>
};
export default stickChartUiRender;