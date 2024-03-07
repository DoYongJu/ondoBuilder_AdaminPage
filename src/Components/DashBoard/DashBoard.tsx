import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import { useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import { MyObjectsState } from '../../Resources/Recoil'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import { FaPlus } from "react-icons/fa";
import DataHub_module,{DataHub_listOfType_module}from '../../Module/Search_module';
import { MyObjects,Option } from '../../Resources/Models';
import CustomChart from '../ViewWaysOfChart/ViewWaysOfChart';
import {searchState, tokenState} from '../../Resources/Recoil';
import SelectBox from '../../Components/SelectBox/SelectBox';
import ConnectApi from '../../Module/ConnectApi';

function DashBoard() {
  const selectList = [
    { id: 1, name: '조회' },
    { id: 2, name: '이름순' },
    { id: 3, name: '주제순' },   
    { id: 4, name: '생성일순' },
    { id: 5, name: '수정일순' },
  ];

  const [Selected, setSelected] = useState(''),
    searchText = useRecoilValue(searchState),
    [originDatas, setOriginDatas] = useState<MyObjects>([]),
    [datas, setDatas] = useState<MyObjects>([]),
    navigate = useNavigate(),
   
    setTheHubInfoRecoil = useSetRecoilState(MyObjectsState);

  useEffect(() => {
    ConnectApi({ method: 'GET', url: `/v1/api/datahub` })
    .then((res) => {
     
      setOriginDatas(res.data); //DataHub_listOfType_module을 위한 원시데이터,
      setDatas(res.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  }, []);

  useEffect(() => {

    const datass =  DataHub_listOfType_module({ data: originDatas }, Selected);
    setDatas(datass);
            
  }, [Selected]);

  useEffect(() => {

    const datass =  DataHub_module({ data: originDatas }, searchText);
    setDatas(datass);
            
  }, [searchText]);


function handleSelect (item:Option){
  setSelected(item.name);
};

  return (
  <div className="dashBoard">
    <div className="title"><span>My Hub List</span></div>
    <div className="sub_title"><span>등록된 허브와 내부 컨텐츠에 대해 확인하실 수 있습니다.</span></div>
    <div className="selectArea">
      <ul><SelectBox handleSelect={handleSelect} selectList={selectList}/></ul>
      <ul><SearchBar/></ul>
    </div>
    <div className='dataHubTemplate'>
        {datas.map((data) => (    
        <div key={data.hub_name} className='theDataHub' onClick={()=>{navigate('/updateDataHub',{state:data}); setTheHubInfoRecoil(data);}}>
          <div className='icon'><img style={{width:'35px', height:'35px'}} src={process.env.PUBLIC_URL + '/dataHub_List_Icon.png'} alt="온도 로고"/></div>
          <div className='headArea'>
            <div className='titleArea'>
              <span className='firstp'>{data.hub_name}</span>
              <span className='secondp' style={{width:'405px', height:'46px'}}>{data.hub_description || "test"}</span>
            </div>
            <div className='contentArea'>
              <ul><p>허브 생성일</p><p>허브 수정일</p> </ul>
              <ul><p>{data.datahub_regdate}</p><p>{data.datahub_upddate}</p></ul>
            </div>
            <div className='innerInfo'><span>내부 정보</span></div>
            <div className='chartArea'><CustomChart data={data}/></div>
          </div>
        </div>
       ))} 
       <div className='theDataHub' onClick={()=>{navigate('/addHub');}}> <div className='theDataHubPlus'><ul><FaPlus size={20}/></ul><ul>허브추가</ul> </div></div>        
    </div>
</div>
  );
};



export default DashBoard;
