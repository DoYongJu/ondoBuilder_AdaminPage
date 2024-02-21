import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import {useRecoilValue} from 'recoil';
import { MyObject } from '../../Resources/Models';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import { FaPlus } from "react-icons/fa";
import DataHub_module,{DataHub_listOfType_module}from '../../Module/Search_module';
import { MyObjects } from '../../Resources/Models';
import CustomChart from '../ViewWaysOfChart/ViewWaysOfChart';
import {searchState, tokenState} from '../../Resources/Recoil';
import SelectBox from '../../Components/SelectBox/SelectBox';
import Cookies from 'js-cookie';

function DashBoard() {
  const selectList = [
    { id: 1, name: '조회' },
    { id: 2, name: '이름순' },
    { id: 3, name: '주제순' },   
    { id: 4, name: '생성일순' },
    { id: 5, name: '수정일순' },
  ];

  const [Selected, setSelected] = useState('');
  const searchText = useRecoilValue(searchState);
  const [datas, setDatas] = useState<MyObjects>([]);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);




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

  useEffect(() => {

    const datass =  DataHub_listOfType_module({ data: datas }, Selected);
    setDatas(datass);
            
  }, [Selected]);

  useEffect(() => {

    const datass =  DataHub_module({ data: datas }, searchText);
    setDatas(datass);
            
  }, [searchText]);

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
function handleSelect (value:string){
  setSelected(value);
};


  return (
  <div className="dashBoard">
    <div className="title"><span>My Hub List</span></div>
    <div className="sub_title"><span>등록된 허브와 내부 컨텐츠에 대해 확인하실 수 있습니다.</span></div>
    <div className="selectArea">
    
      <ul>
        <SelectBox handleSelect={handleSelect} selectList={selectList}/>
        {/* <select onChange={handleSelect} value={Selected}>
                  {selectList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
        </select> */}
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
