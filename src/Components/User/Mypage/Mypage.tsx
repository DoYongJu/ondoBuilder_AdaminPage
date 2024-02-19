import React, { useState } from 'react';
import './Mypage.css';
import TabBar from '../../TabBar/TabBar';

const Mypage =()=>{

   
    return(
    <div className="myPage">
        <div className='tabBar'>
           <TabBar/>
        </div>
        <div className='content'>
            <ul>사용자 정보</ul>
            <ul>내 정보를 확인하고 수정하실 수 있습니다.</ul>
            <ul>로그인 정보</ul>
            <ul/>
            <ul>
                <li>이메일</li>
                <li>jointree0000@gmail.com</li>
            </ul>
            <ul>
                <li>비밀번호</li>
                <li>비밀번호 버튼 위치</li>
            </ul>
            <ul>사용자 정보</ul>
            <ul/>
            <ul>
                <li>이름</li>
                <li>홍길동동</li>
            </ul>
            <ul>
                <li>전화번호</li>
                <li>010-0000-0000</li>
            </ul>
            <ul>
                <li>회사명</li>
                <li>조인트리</li>
            </ul>
            <ul>
                <li>소속</li>
                <li>00팀</li>
            </ul>
            <ul>
                <button><span>내 정보변경</span></button>
            </ul>
        </div>
    </div>
    );
};

export default Mypage;