import React, { useState } from 'react';
import {MyObject, dataProps } from '../../Resources/Models';
import BarChartUi from '../BarChart/BarChartUi';
import CircleChartUi from '../CircleChart/CircleChartUi';
import dataHandler from '../../Module/DataHubTemplate';
import './ViewWaysOfChart.css';

const ViewWaysOfChart: React.FC<dataProps>=({data})=>{
    const [chartType, setChartType] = useState('');
    const [activeButton1, setActiveButton1] = useState('default');
    const [activeButton2, setActiveButton2] = useState('');
   //useEffct를 활용하여 value가 바뀔따마다 랜더링, 버튼 누르고 값 바뀌는지 확인해야함. 
    function handleBtn1(e: any){
        setChartType(e.target.dataset.value); 
        setActiveButton1('default');
        setActiveButton2('');
        e.stopPropagation();
       
    };
    function handleBtn2(e: any){
        setChartType(e.target.dataset.value); 
        setActiveButton1('');
        setActiveButton2('default');
        e.stopPropagation();
      
       
      

    };
    const colorCord = ['#E8E9EB','#292969', '#284FB5', '#3B97CE', '#74C2E3'];

    function contentsss(data:MyObject){
        switch(chartType){
            case "cir" : return (
            <div className='cirChartDocArea'>
               {dataHandler(data).map((data, i) => (
                    data.name === 'none' ? (
                        i > 0 ? (
                            <ul className='cirChartDoc' key={i}>
                                <li style={{ backgroundColor: colorCord[i] }}></li>
                                <li>{data.name}</li>
                                <li>{data.val} 개</li>
                            </ul>
                        ) : null
                    ) : (
                        <ul className='cirChartDoc' key={i}>
                            <li style={{ backgroundColor: colorCord[i] }}></li>
                            <li>{data.name}</li>
                            <li>{data.val} 개</li>
                        </ul>
                    )
                ))}
            </div>);
            
            default : return (
            <div className='barChartDocArea'>
                {dataHandler(data).map((data,i)=>(
                    i > 0 ? (
                    <ul className='barChartDoc'key={i}>
                        <li style={{ backgroundColor: colorCord[i]}}></li>
                        <li>{data.name}</li>
                        <li>{data.val} 개</li>
                    </ul>
                  ) : null 
                ))}
            </div>);
          };
    };

    function renderChart (data:MyObject){
        switch(chartType){
          case "cir" : return <div className='cirChart'><CircleChartUi data={data}/>{contentsss(data)}</div>;
          default : return <div className='BarChart'  style={{paddingTop:'23px'}}><BarChartUi data={data} />{contentsss(data)}</div>;
        };
   
    }
    return(
    <>
    <div className='dataHubBtnArea'>
        <ul>
            <li className={activeButton1 === 'default' ? 'active' : ''} onClick={handleBtn1} data-value="default">
                바 그래프
            </li>
            <li className={activeButton2 === 'default' ? 'active' : ''} onClick={handleBtn2} data-value="cir">
                파이 그래프 
            </li> 
        </ul>
    </div>

   
    {renderChart(data)} 
    
   
   </>
    );
};
export default ViewWaysOfChart;