import React from 'react';
import './CreateDataHub.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CreateDataHub() {
  const navigate = useNavigate();
  const [text, setInfoText] = useState('');  
  const [activeButton, setActiveButton] = useState('default');
  const [currentCount, setCurrentCount] = useState(0);
  const writer = Cookies.get('username');
  const totalCount = 50;
  const buttons = [
    { label: '정보', value: 'info' },
    { label: '문서', value: 'doc' },
    { label: '이미지', value: 'img' },
    { label: '동영상', value: 'video' },
    { label: '링크', value: 'link' },
  ];

  useEffect(() => {
    setCurrentCount(text.length);
  }, [text]);


  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setInfoText(newText);
  };
  
  const handleButtonClick = (value:string) => {
  
    switch(value){
      case "doc" :   navigate('/ActiveHublist',{state:value}); break;
      case "img" :  navigate('/ActiveHublist',{state:value}); break;
      case "video" :  navigate('/ActiveHublist',{state:value}); break;
      case "link" :  navigate('/ActiveHublist',{state:value}); break;
      default :   navigate('/UpdateDataHub');break;
    };
    setActiveButton(value);
  };

  function today(){
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
    return formattedDate;
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
        <div className="key1"><span>허브 이름</span> <span>허브 설명</span></div>
        <div className="value">
          <input type="text" />
          <input type="text" onChange={handleTextChange}></input>
          <div className="counters">
            <span id="currentCount">{currentCount}</span>/
            <span id="totalCount">{totalCount}</span>(글자수)
          </div>
          <div className="hubInfoBodyBtnArea">
          <button>수정사항 저장</button>
          </div>
        </div>
      </div>

      <div className="hubInfoDetails">
        <div className="detailsInfo"><span>세부 정보</span></div>
        <div className="hrLine"></div>  
      </div>

      <div className="hubInfoDetailsBody">
        <div className="key1"><span>생성자</span> <span>생성일</span> <span>마지막 수정일</span></div>
        <div className="value"><span>{writer}</span><span>{today()}</span><span>{today()}</span></div>
      </div>
    </div>
  );
}
export default CreateDataHub;
