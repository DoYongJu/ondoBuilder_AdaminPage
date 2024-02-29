import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userFullInfoList } from '../../../Resources/Models';
import { userFullInfoState } from '../../../Resources/Recoil'
import MypageInfoModal from '../../Atoms/MyPageInfoModal/MypageInfoModal';
import ConnectApi from '../../../Module/ConnectApi';
import TabBar from '../../TabBar/TabBar';
import './AdminUser.css'
const AdminUser=()=>{
    const [viewInputModal, setViewInputModal] = useState<string>(''),
        [userWaitingList, setUserWaitingList] = useState<userFullInfoList>([]),
        [userList, setUserList] = useState<userFullInfoList>([]),
        [userInfo] = useRecoilState (userFullInfoState),
        setUserInfoRecoil = useSetRecoilState(userFullInfoState);

    function setUserListApi(){
        ConnectApi({ method: 'GET', url: `/v1/api/auth/users` }) 
        .then((res) => {
            let data = res.data; 
            setUserList(data);
        })
        .catch((error) => {
            console.error('getCaroselGroupApi/ Error occurred:', error);
        });
    };

    function setUserWaitingListApi() {
        ConnectApi({ method: 'GET', url: `/v1/api/` }) //02.26 url 삽입예정 승인대기 사용자get api
            .then((res) => {
                setUserWaitingList(res.data); //02.28 api 개발 미완성. 추후 확인 필요 일단 세팅완료.
            })
            .catch((error) => {
                console.error('getCaroselGroupApi/ Error occurred:', error);
            });
    };
    
    useEffect(() => {   
        setUserWaitingListApi(); //승인대기유저정보get.
        setUserListApi(); // 기존유저정보 get. 
    }, [viewInputModal]);

    function handleDelBtn(id:number){
        ConnectApi({ method: 'DELETE', url: `/v1/api/auth/revoke/${id}`})
        .then((res) => {
            let data =  res.data;
            if(data.result === true){
                setUserListApi();
            }

        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
    };

    function handleResetPwd(id:number){
        ConnectApi({ method: 'PATCH', url: `/v1/api/auth/reset/${id}`})
            .then((res) => {
                let data =  res.data;
                if(data.result === true){
                    setUserListApi();
                    alert('비밀번호가 초기화 되었습니다.')// 사용자 알람이 필요하지 않을까..
                };
            })
            .catch((error) => {
                console.error('Error occurred:', error);
            }); 
    };

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
                {userWaitingList.map((item, index) => (
                    <div key={index} className="userInfoWaitingList">
                        <ul>
                            <li>{item.email}</li>
                            <li>{item.tel}</li>
                            <li>{item.division}</li> 
                            <li>{item.company}</li>
                            <li>{item.username}</li>
                            <li>가입일 데이터 필요</li>
                            <li>
                                <button className='ok'>승인</button>
                                <button className='refuse'>거절</button>
                            </li>
                        </ul>
                        
                    </div>
                ))}
            </div>
            <div className='userList'>
                <ul><span>사용자 리스트</span></ul>
                <ul>
                    <li>이메일</li>
                    <li>전화번호</li>
                    <li>소속</li>
                    <li>회사</li>
                    <li>이름</li>
                    <li>계정 생성일</li>
                </ul>
                {userList.map((item, index) => (
                    <>
                    <div key={index} className="userInfohistoryList">
                        <ul>
                            <li>{item.email}</li>
                            <li>{item.tel}</li>
                            <li>{item.division}</li> 
                            <li>{item.company}</li>
                            <li>{item.username}</li>
                            <li>생성일 데이터</li>
                            <li>
                                <button className='resetpwd'  onClick={()=>{setUserInfoRecoil(item); handleResetPwd(item.uid)}}>비밀번호 초기화</button>
                                <button className='edit' onClick={()=>{setViewInputModal('changeInfo'); setUserInfoRecoil(item); }}>수정</button> 
                                <button className='delete'onClick={()=>handleDelBtn(item.uid)}>삭제</button>
                            </li>
                        </ul>
                    
                    </div>

                   </>  
                ))}
            </div>
        </div>
        {viewInputModal === 'changeInfo' &&
            <div className="overlay"> 
                <MypageInfoModal onClose={()=>{setViewInputModal('');}} action={viewInputModal} infoDetails={userInfo} /> 
            </div>  
        }
    </div>
    );
};
export default AdminUser;