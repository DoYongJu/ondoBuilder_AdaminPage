import React, { useState, useEffect } from 'react';
import './DashBoard.css';
import {useRecoilValue} from 'recoil';
import { MyObject } from '../../Resources/Models';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import { FaPlus } from "react-icons/fa";
import DataHub_module from '../../Module/Search_module';
import { MyObjects } from '../../Resources/Models';
import CustomChart from '../ViewWaysOfChart/ViewWaysOfChart';
import {searchState } from '../../Resources/Atoms';

function DashBoard() {

  const selectList = ['조회', '이름별', '주제별','생성일','마지막수정일'];
  const [Selected, setSelected] = useState('');
  const [, setSearchType] = useState('');
  const searchText = useRecoilValue(searchState);
  const [datas, setDatas] = useState<MyObjects>([]);
  const navigate = useNavigate();


useEffect(() => {
  const datass =  DataHub_module({dummyData},searchText);
  setDatas(datass);
          
}, [searchText]);

  
function handleSelect (e:any){
  const selectedValue = e.target.value;
  setSelected(selectedValue);
  setSearchType(selectedValue);
};

function ClickTheDataHub( data: MyObject){
  navigate('/UpdateDataHub',{state:data}); 
};

  return (
  <div className="dashBoard">
    <div className="title"><span>My Hub List</span></div>
    <div className="sub_title"><span>등록된 허브와 내부 컨텐츠에 대해 확인하실 수 있습니다.</span></div>
    <div className="selectArea">
      <ul>
        <select onChange={handleSelect} value={Selected}>
                  {selectList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
        </select>
      </ul>
      <ul>
        <SearchBar/>
      </ul>
    </div>
    <div className='dataHubTemplate'>
        {datas.map((data) => (    
        <div key={data.name} className='theDataHub' onClick={()=>ClickTheDataHub(data)}>
          <div className='icon'><img style={{width:'35px', height:'35px'}} src={process.env.PUBLIC_URL + '/dataHub_List_Icon.png'} alt="온도 로고"/></div>
          <div className='headArea'>
            <ul><p className='firstp'>{data.name}</p></ul>
            <ul><p style={{width:'405px', height:'46px'}}>{data.title || "test"}</p></ul>
          </div>
          <div className='chartArea'><CustomChart data={data}/></div>
          <div className='contentArea'>
            <ul><p>생성일</p><p>마지막 수정일</p> </ul>
            <ul><p>{data.generateDate}</p><p>{data.lastEditDate}</p></ul>
          </div>
        </div>
       ))} 
       <div className='theDataHub'> <div className='theDataHubPlus'><ul><FaPlus size={20}/></ul><ul>허브추가</ul> </div></div>        
    </div>
  </div>
  );
};


const dummyData : MyObjects = [
  {
    "hub_id": 1,
    "name": "도용주 1",
    "generateDate": "2022-01-11",
    "lastEditDate": "2022-01-12",
    "title": "First entFirst DoentFirst DocumentFiocumentFirst DocumentFirst DocumentDocument",
    "doc": 5,
    "img": 4,
    "text": 3,
    "link": 2,
   
  },
  {
    "hub_id": 2,
    "name": "Document 2fffffffffffff",
    "generateDate": "2022-01-10",
    "lastEditDate": "2022-01-30",
    "title": "First Documentccccccccccccccccccccccccccccccccccccc",
    "doc": 15,
    "img": 1,
    "text": 2,
    "link": 1,
   
  },
  {
    "hub_id": 3,
    "name": "Document 3",
    "generateDate": "2022-01-10",
    "lastEditDate": "2022-01-15",
    "title": "First Document",
    "doc": 15,
    "img": 9,
    "text": 13,
    "link": 1,
   
  },
  {
    "hub_id": 4,
    "name": "Document 4",
    "generateDate": "2022-01-10",
    "lastEditDate": "2022-01-13",
    "title": "First Document",
    "doc": 2,
    "img": 4,
    "text": 1,
    "link": 2,
   
  },
  {
    "hub_id": 5,
    "name": "Document 5",
    "generateDate": "2022-01-16",
    "lastEditDate": "2022-01-13",
    "title": "Second Document",
    "doc": 1,
    "img": 6,
    "text": 7,
    "link": 2,
   
  },

];
export default DashBoard;
