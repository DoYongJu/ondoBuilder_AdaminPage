import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {MyObject, dataProps } from '../../Resources/Models';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar'
import SelectBox from '../SelectBox/SelectBox';
import UploadFile from '../UploadFile/UploadFile';
import { LuListFilter } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import './ActiveHublist.css';


function ActiveHublist(){
    const location = useLocation();
    const navigate = useNavigate();
    const [viewUpload, setViewUpload] = useState(false);
    const [, setSelected] = useState('');
    const [, setSearchType] = useState('');
    const [, setSearchText] = useState('');
    const [activeButton, setActiveButton] = useState('default');
    const selectList = ['조회', '이름별', '주제별','생성일','수정일'];

    const data:any= location.state;
    
    console.log(data);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const handleCloseSideBar = () => {
      setIsSideBarOpen(false);
    };

    function handleCloseFileUpload(){
        setViewUpload(false);
    };

    const buttons = [
        { label: '정보', value: 'info' },
        { label: '문서', value: 'doc' },
        { label: '이미지', value: 'img' },
        { label: '동영상', value: 'video' },
        { label: '링크', value: 'link' },
    ];

    function handleSelect (selectedValue:any){
        setSearchText('');
        setSelected(selectedValue);
        setSearchType(selectedValue);
    };

    const handleButtonClick = (value:string) => {
  
        switch(value){
          case "doc" :   navigate('/ActiveHublist',{state:data}); break;
          case "img" :  navigate('/ActiveHublist',{state:data}); break;
          case "video" :  navigate('/ActiveHublist',{state:data}); break;
          case "link" :  navigate('/ActiveHublist',{state:data}); break;
          default :   navigate('/UpdateDataHub',{state:data}); 
        setActiveButton(value);
        };
    };

    return (

      <div className={`activeHublist ${isSideBarOpen ? 'sidebarOpen' : ''}`}>

        <div className="title"><span>데이터 허브 이름</span></div>
        <div className="sub_title"><span>데이터허브 설명 공간 최대로 표시하는 글자수는 
            50자로 한정하여 해당 케이스는 최대일 경우</span></div>
        <div className='dataHubBtnArea'>
            <ul>
            {buttons.map((button, index) => (
                <li key={index}>
                <button className={activeButton === button.value ? 'active' : ''}
                    onClick={() => handleButtonClick(button.value)}
                    value={button.value} >
                    {button.label}
                </button>
                </li>
            ))}
            </ul>
           
        </div>
        <div className='selectAndSearch'>
            <div className='selectArea'>
                <div className='real'>
                    <SelectBox handleSelect ={handleSelect} selectList={selectList}/>
                </div>
                <SearchBar />
            </div>
            <div className='buttonArea'>
                <button className='filter' value='필터'>
                    <LuListFilter size={20}/>필터
                </button>
                <button className='fileupload' value='파일업로드' onClick={()=>{ setViewUpload(true);}}>
                    <FiUpload /> 파일업로드
                </button>               
            </div>
        </div>

        <div className='contbox'>
        <div className='theActiveHub' onClick={()=>{ setIsSideBarOpen(!isSideBarOpen);}}> 사이드 바 열기 </div>
        <div className='theActiveHub'>  </div>
        <div className='theActiveHub'>  </div>
        <div className='theActiveHub'>  </div>
        <div className='theActiveHub'>  </div>
        <div className='theActiveHub'>  </div>
        <div className='theActiveHub'>  </div>
        {/* {data.map((item:MyObject) => (    
            <div className='theActiveHub'> {item.name} </div>
            ))} */}
        
        </div>
        <SideBar isOpen={isSideBarOpen} onClose={handleCloseSideBar} /> 
        {viewUpload?(  <div className="overlay"> <UploadFile onClose={handleCloseFileUpload} /> </div>  ):('')}
      
    </div>
    
    );
};
export default ActiveHublist;