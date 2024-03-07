import React, {useState,useEffect } from 'react';
import './UpdateDataHub.css';
import Cookies from 'js-cookie';
import { hubClassfiyState } from '../../../Resources/Recoil';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {MyObject} from '../../../Resources/Models';
import ConnectApi from '../../../Module/ConnectApi';
import Alert from '../../Modal.components/Alert/Alert';
import { MyObjectsState } from '../../../Resources/Recoil'



function UpdateDataHub() {
  const setHubClassify = useSetRecoilState(hubClassfiyState);
  const type = useRecoilValue(hubClassfiyState);
  const navigate = useNavigate();

  const writer = Cookies.get('username');
  const location = useLocation();
  // const data:MyObject= location.state;
  const  [theHubInfo] = useRecoilState (MyObjectsState);

  const [activeButton, setActiveButton] = useState('info')|| type;
  const [nametext, sethubNameText] = useState('');
  const [changeInfo, setChangeInfo] = useState(false);
  const [viewAlart, setViewAlart] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [currentCount, setCurrentCount] = useState(0);
  const totalCount = 50;
  console.log("type: "+type);
  console.log('hubId :'+theHubInfo.hub_id);


  useEffect(() => {
    console.log(theHubInfo);
    sethubNameText(theHubInfo.hub_name);
    setInfoText(theHubInfo.hub_description);
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

  function changehubInfoApi() {
    setChangeInfo(!changeInfo);

    const sendParam = {
      hub_id: Number(theHubInfo.hub_id),
      hub_name:nametext,
      hub_description: infoText,
    };

    ConnectApi({ method: 'PATCH', url: '/v1/api/datahub', sendParam: sendParam })
      .then((res) => {
      console.log(res);
      navigate('/updateDataHub',{state:res.data}); 
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };
  
  const handleButtonClick = (value:string) => {
    setHubClassify(value);
    switch(value){
      case "doc" :   navigate('/activeHublist',{state:theHubInfo}); break;
      case "img" :  navigate('/activeHublist',{state:theHubInfo}); break;
      case "video" :  navigate('/activeHublist',{state:theHubInfo}); break;
      case "link" :  navigate('/activeHublist',{state:theHubInfo}); break;
      default :   navigate('/updateDataHub',{state:theHubInfo}); 
    };
    setActiveButton(value);
  };

  async function handleDeleteHub(){
    const sendParam = {
      hub_id: theHubInfo.hub_id
    };

    ConnectApi({ method: 'DELETE', url: '/v1/api/datahub', sendParam: sendParam })
    .then((res) => {
    console.log(res);
    console.log('데이터 허브 삭제 완료');
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
  };
  const cancelEdit=()=>{
    setViewAlart(true);
  };
  const closeAlart=()=>{
    setViewAlart(false);
  };
  const onCustomBtn=()=>{
    setChangeInfo(!changeInfo);
    setViewAlart(false);
  };
  return (
    
    <div className="UpdateDataHub">
      <div className="title"><span>{theHubInfo.hub_name}</span></div>
      <div className="sub_title"><span>{theHubInfo.hub_description}</span></div>
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
          {!changeInfo &&<div className='hubnameSpace'><span>{theHubInfo.hub_name}</span></div>}
          {changeInfo && 
          <div className='hubnameSpace'> 
            <input type="text" value={nametext}  onChange={(e)=>{sethubNameText(e.target.value.replace(/^\s+/, ''))}}></input>
          </div>}  
        </div>
        <div className='second'>
          <div className='hubnameArea'><span>허브 설명</span></div>
          {!changeInfo && <div className='hubnameSpace'><span>{theHubInfo.hub_description}</span></div>}
          {changeInfo &&  
            <div className='hubnameSpace'>
              
              <textarea  value={infoText} maxLength={totalCount}  onChange={(e)=>{setInfoText(e.target.value.replace(/^\s+/, ''))}}></textarea>
              <div className="counters">
                  <span id="currentCount">{currentCount}</span>/
                  <span id="totalCount">{totalCount}</span>(글자수)
                </div>
            </div>}  
        </div>

        <div className="hubInfoBodyBtnArea">
        {changeInfo &&  
          <> 
            <button className='cancleInfo' onClick={cancelEdit}>수정 취소 </button> 
            <button className='saveInfo' onClick={changehubInfoApi}>정보 저장 </button> 
          </>}
        {!changeInfo &&   <button onClick={()=>{setChangeInfo(!changeInfo)}}>허브 정보 수정 </button> }
        </div>
       
      </div>

      <div className="hubInfoDetails">
        <div className="detailsInfo"><span>세부 정보</span></div>
        <div className="hrLine"></div>  
      </div>

      <div className="hubInfoDetailsBody">
        <div className="key1"><span>생성자</span> <span>생성일</span> <span>수정일</span></div>
        <div className="value"><span>{writer}</span> <span>{theHubInfo.datahub_regdate}</span> <span>{theHubInfo.datahub_upddate}</span></div>
      </div>
      
      <div className="hubInfoDetailsFooter">
        <div className="title"><span>데이터 허브 삭제</span> </div>
        <div className="description"><span>데이터허브를 삭제하시면, 연결된 모든 챗봇, 어시스턴트, 업로드된 파일, 이미지, 동영상 및 URL 링크들도 함께 사라집니다. 데이터허브에서는 백업 기능을 제공하지 않기 때문에, 한번 삭제되면 모든 데이터는 복구할 수 없게 됩니다.</span></div>
        <div className="buttonArea"><button onClick={handleDeleteHub}>데이터 허브 삭제</button></div>
      </div>
      {viewAlart && <Alert onClose={closeAlart} action='dataHub' onCustomBtn={onCustomBtn}/>}
    </div>
  );
};
export default UpdateDataHub;