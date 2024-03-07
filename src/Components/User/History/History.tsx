import React, { useState, useEffect } from 'react';
import ConnectApi from '../../../Module/ConnectApi';
import { userFullInfoList } from '../../../Resources/Models';
import Pagination from '@mui/material/Pagination';
import './History.css';
import TabBar from '../../TabBar/TabBar';

const History =() =>{

    const [userInfos, setUserInfos] = useState<userFullInfoList>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 페이지네이션 계산을 위한 변수들
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userInfos.slice(indexOfFirstItem, indexOfLastItem);

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
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
      };

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
              
                {currentItems.map((item, index) => (
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
            <div className="pagination">
                {currentPage && 
                 <Pagination count={10} page={currentPage} onChange={handleChange} size='medium' />
                }
               
            </div>
        </div>
    );
};
export default History;