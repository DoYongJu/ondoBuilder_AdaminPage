import React, { useState, useEffect } from 'react';
import './Mypage.css';
import TabBar from '../../TabBar/TabBar';
import ConnectApi from '../../../Module/ConnectApi';
import {userInfoType} from '../../../Resources/Models';

const Mypage =()=>{
    const [userInfo, setUserInfo] = useState<userInfoType | null>(null);
    useEffect(() => {

        function setMyinfoApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/auth/mypage` })
                .then((res) => {
                    let data = res.data;
                    setUserInfo(data);
 
                })
                .catch((error) => {
                    console.error('getCaroselGroupApi/ Error occurred:', error);
                });
        };
        setMyinfoApi(); //개인정보get.
     
    }, []);
   
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
                <li>{userInfo?.email}</li>
            </ul>
            <ul>
                <li>비밀번호</li>
                <li><button><span>비밀번호 변경</span></button></li>
            </ul>
            <ul>사용자 정보</ul>
            <ul/>
            <ul>
                <li>이름</li>
                <li>{userInfo?.username}</li>
            </ul>
            <ul>
                <li>전화번호</li>
                <li>{userInfo?.tel}</li>
            </ul>
            <ul>
                <li>회사명</li>
                <li>{userInfo?.company}</li>
            </ul>
            <ul>
                <li>소속</li>
                <li>{userInfo?.division}</li>
            </ul>
            <ul>
                <button><span>내 정보변경</span></button>
            </ul>
        </div>
    </div>
    );
};

export default Mypage;