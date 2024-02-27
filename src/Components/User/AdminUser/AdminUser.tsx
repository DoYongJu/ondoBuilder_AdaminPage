import React, { useState, useEffect } from 'react';
import { userFullInfoList } from '../../../Resources/Models';
import ConnectApi from '../../../Module/ConnectApi';
import TabBar from '../../TabBar/TabBar';
import './AdminUser.css'
const AdminUser=()=>{
const [userInfos, setUserInfos] = useState<userFullInfoList>([]); 

    useEffect(() => {
        function setUserApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/` }) //02.26 url 삽입예정 승인대기 사용자get api
                .then((res) => {
                    let data = res.data;
                    setUserInfos(data); //추후 확인 필요
                
                })
                .catch((error) => {
                    console.error('getCaroselGroupApi/ Error occurred:', error);
                });
        };
        setUserApi(); //승인대기유저정보get.
     
    }, []);

 return( 
 <div className="AdminUser">
    <div className='tabBar'>
        <TabBar/>
    </div>
    <div className='content'>
        <ul>사용자 관리</ul>
        <ul>등록된 사용자들의 정보를 확인하고 관리할 수 있습니다.</ul>
        <div className='waitingListArea'>
            <ul><span>가입 승인 대기</span></ul>
            <ul>
                <li>이메일</li>
                <li>전화번호</li>
                <li>소속</li>
                <li>회사</li>
                <li>이름</li>
                <li>승인 신청일</li>
                <li>&nbsp;</li>
            </ul>
            {userInfos.map((item, index) => (
                <div key={index} className="userInfoHistoryList">
                     <ul>
                        <li>{item.email}</li>
                        <li>{item.tel}</li>
                        <li>{item.division}</li> 
                        <li>{item.company}</li>
                        <li>{item.username}</li>
                        <li>가입일 데이터 필요</li>
                    </ul>
                    
            
                </div>
            ))}
        </div>
       
    </div>
    
</div>);
};
export default AdminUser;