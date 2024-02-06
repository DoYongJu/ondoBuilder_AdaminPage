import React, { useState, useEffect } from 'react';
import './InfoDataHub.css';
import { FaListUl } from "react-icons/fa6";
import { BiGridAlt } from "react-icons/bi";
import { BiDotsHorizontalRounded } from "react-icons/bi";


/*
대쉬보드에서 허브를 누르면 연결되는 페이지.
데이터 허브의 데이터를 업로드 하고 분류/ 조회 하는 페이지.
*/

function InfoDataHub() {
    const buttonLists = ['문서', '이미지', '동영상', '링크'];
    const selectList = ['조회', '이름순', '생성일순',];
    const [Selected, ] = useState('');
    function handleSelect (){

    }
    return(
    <div className="InfoDataHub">
        <div className="title">
            <ul>데이터 허브 이름</ul>
            <ul className='InfoDataHubIcons'>
                <ul className='InfoDataHubIcon'>
                   
                    <button className='ficon'> <BiGridAlt size="18"/></button>
                    <button className='sicon' > <FaListUl size="18"/></button>
                </ul>

                <ul className='InfoDataHubIcon'>
                    <button className='ticon'> <BiDotsHorizontalRounded size="18"/></button>
                </ul>
            </ul>
        </div>
        <p className="sub_title">데이터허브 설명 공간. 공간최대 글자수는 50자 조건.</p>
        
        <div className='classfiyDoc'>
           {buttonLists.map((option, index) => (
                <button key={index} className='classfiyDocItem'>{option}</button>
              ))}
        </div>
        <div className="InfoDataHubContent">  
           
                <select  onChange={handleSelect} value={Selected}>
                {selectList.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
                </select>
      
        </div>
    </div>
    );
};
export default InfoDataHub;