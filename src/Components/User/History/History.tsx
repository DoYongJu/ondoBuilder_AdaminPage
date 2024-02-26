import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ConnectApi from '../../../Module/ConnectApi';
import { userFullInfoList } from '../../../Resources/Models';
import { userInfoState } from '../../../Resources/Recoil'
import './History.css';
import TabBar from '../../TabBar/TabBar';

const History =() =>{

const [userInfos, setUserInfos] = useState<userFullInfoList>([]);

    useEffect(() => {

        function setMyinfoApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/auth/users` })
                .then((res) => {
                    let data = res.data;
                    setUserInfos(data);
                })
                .catch((error) => {
                    console.error('getCaroselGroupApi/ Error occurred:', error);
                });
        };
        setMyinfoApi(); //개인정보get.
     
    }, []);

    return(
        <div className="history">
            <div className='tabBar'>
                <TabBar/>
            </div>
            <div className='content'>
                <ul>히스토리</ul>
                <ul>사용자의 작업내역을 확인할 수 있습니다.</ul>
                <ul>
                    <li>Date& Time</li>
                    <li>이름</li>
                    <li>작업내역</li>
                </ul>
              
                {userInfos.map((item, index) => (
                    <div key={index} className="userInfoHistoryList">
                        <ul>
                            <li>{item.user_regdate}</li>
                            <li>{item.username}</li>
                            {/* 02.26 퍼블리싱 및 데이터 확인. 추후 하기의 데이터 개발 필요 */}
                            <li>작업내역 기입 예정</li> 
                        </ul>
            
                    </div>
                ))}
            </div>
        </div>
    );
};
export default History;