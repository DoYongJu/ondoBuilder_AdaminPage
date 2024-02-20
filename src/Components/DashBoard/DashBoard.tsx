import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import {useRecoilValue} from 'recoil';
import { MyObject } from '../../Resources/Models';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import { FaPlus } from "react-icons/fa";
import DataHub_module from '../../Module/Search_module';
import { MyObjects } from '../../Resources/Models';
import CustomChart from '../ViewWaysOfChart/ViewWaysOfChart';
import {searchState, tokenState} from '../../Resources/Recoil';
import Cookies from 'js-cookie';

function DashBoard() {

  const selectList = ['조회', '이름별', '주제별','생성일','마지막수정일'];
  const [Selected, setSelected] = useState('');
  const [, setSearchType] = useState('');
  const searchText = useRecoilValue(searchState);
  const [datas, setDatas] = useState<MyObjects>([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);

//   useEffect(() => {
//     let dataFromApi = setDashBoardApi();
//     setDatas(dataFromApi);
            
//   }, []);
// useEffect(() => {

//   const datass =  DataHub_module(datas,searchText);
//   setDatas(datass);
          
// }, [searchText]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const responseData = await setDashBoardApi();
      // console.log(responseData);
      if (responseData) {
        setDatas(responseData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

async function setDashBoardApi(): Promise<MyObjects> {
  
  try {
    const response = await axios({
      method: 'GET',
      url: process.env.REACT_APP_API + '/v1/api/datahub',
      headers: {"accept": 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${Cookies.get('accessToken')}`},
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};  
function handleSelect (e:any){
  const selectedValue = e.target.value;
  setSelected(selectedValue);
  setSearchType(selectedValue);
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
        <div key={data. hub_name} className='theDataHub' onClick={()=>navigate('/updateDataHub',{state:data})}>
          <div className='icon'><img style={{width:'35px', height:'35px'}} src={process.env.PUBLIC_URL + '/dataHub_List_Icon.png'} alt="온도 로고"/></div>
          <div className='headArea'>
            <div className='titleArea'>
              <span className='firstp'>{data. hub_name}</span>
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
