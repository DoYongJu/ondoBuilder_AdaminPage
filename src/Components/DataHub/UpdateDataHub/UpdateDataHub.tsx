import React, {useState,useEffect, ChangeEvent } from 'react';
import './UpdateDataHub.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {MyObject} from '../../../Resources/Models'
import Cookies from 'js-cookie';

function UpdateDataHub() {
  const navigate = useNavigate();
  const location = useLocation();
  const writer = Cookies.get('username');
  const data:MyObject= location.state;
  console.log(data);

  const [activeButton, setActiveButton] = useState('info')|| location.state;
  const [nametext, sethubNameText] = useState('');
  const [changeInfo, setChangeInfo] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [currentCount, setCurrentCount] = useState(0);
  const totalCount = 50;
 

  useEffect(() => {
    sethubNameText(data.name);
    setInfoText(data.title);
  }, []);


  useEffect(() => {
    setCurrentCount(infoText.length);
  }, [infoText]);

  const buttons = [
    { label: '정보', value: 'info' },
    { label: '문서', value: 'doc' },
    { label: '이미지', value: 'img' },
    { label: '동영상', value: 'video' },
    { label: '링크', value: 'link' },
  ];



  const handleInfoChange = (event: any) => {
    const newText = event.target.value;
    setInfoText(newText);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    sethubNameText(newText);
  };
  
  const handleButtonClick = (value:string) => {
    switch(value){
      case "doc" :   navigate('/ActiveHublist',{state:data}); break;
      case "img" :  navigate('/ActiveHublist',{state:data}); break;
      case "video" :  navigate('/ActiveHublist',{state:data}); break;
      case "link" :  navigate('/ActiveHublist',{state:data}); break;
      default :   navigate('/UpdateDataHub',{state:data}); 
    };
    setActiveButton(value);
  };

  function handleDeleteHub(){
    console.log(`데이터 허브 삭제 버튼 눌림`);
  };

  return (
    
    <div className="UpdateDataHub">
      <div className="title"><span>데이터 허브 이름</span></div>
      <div className="sub_title"><span>데이터허브 설명 공간 최대로 표시하는 글자수는 50자로 한정하여 해당 케이스는 최대일 경우</span></div>
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
      
      <div className="hubInfoTitle" >
        <div className="nameInfo"><span>허브 정보</span></div>
        <div className="hrLine"></div>  
      </div>

      <div className="hubInfoBody">
        <div className="first">
          <div className='hubnameArea'><span>허브 이름</span></div> 
          {!changeInfo &&<div className='hubnameSpace'><span>허브이름 스페이스</span></div>}
          {changeInfo && 
          <div className='hubnameSpace'> 
            <input type="text" value={nametext}  onChange={handleNameChange}></input>
          </div>}  
        </div>
        <div className='second'>
          <div className='hubnameArea'><span>허브 설명</span></div>
          {!changeInfo && <div className='hubnameSpace'><span>데이터 허브 설명 공간</span></div>}
          {changeInfo &&  
            <div className='hubnameSpace'>
              
              <textarea  value={infoText} maxLength={totalCount}  onChange={handleInfoChange}></textarea>
              <div className="counters">
                  <span id="currentCount">{currentCount}</span>/
                  <span id="totalCount">{totalCount}</span>(글자수)
                </div>
            </div>}  
        </div>

        <div className="hubInfoBodyBtnArea">
        {changeInfo &&   <button className='saveInfo' onClick={()=>{setChangeInfo(!changeInfo)}}>정보 저장 </button> }
        {!changeInfo &&   <button onClick={()=>{setChangeInfo(!changeInfo)}}>허브 정보 수정 </button> }
        </div>
       
      </div>

      <div className="hubInfoDetails">
        <div className="detailsInfo"><span>세부 정보</span></div>
        <div className="hrLine"></div>  
      </div>

      <div className="hubInfoDetailsBody">
        <div className="key1"><span>생성자</span> <span>생성일</span> <span>마지막 수정일</span></div>
        <div className="value"><span>{writer}</span> <span>{data.generateDate}</span> <span>{data.lastEditDate}</span></div>
      </div>
      
      <div className="hubInfoDetailsFooter">
        <div className="title"><span>데이터 허브 삭제</span> </div>
        <div className="description"><span>데이터허브를 삭제하시면, 이와 연결된 모든 챗봇, 어시스턴트, 업로드된 파일, 이미지, 동영상 및 URL 링크들도 함께 사라집니다. 중요한 점은, 데이터허브에서는 백업 기능을 제공하지 않기 때문에, 한번 삭제되면 모든 데이터는 복구할 수 없게 됩니다. 따라서 삭제 전에 필요한 정보가 있다면, 반드시 따로 저장해두시기 바랍니다</span></div>
        <div className="buttonArea"><button onClick={handleDeleteHub}>데이터 허브 삭제</button></div>
      </div>
    </div>
  );
};
export default UpdateDataHub;