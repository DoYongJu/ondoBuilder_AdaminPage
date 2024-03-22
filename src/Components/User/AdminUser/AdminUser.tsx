import React, { useState, useEffect } from 'react';
import axios from "axios"
import Cookies from 'js-cookie';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userFullInfoList } from '../../../Resources/Models';
import { userInfoState } from '../../../Resources/Recoil'
import MypageInfoModal from '../../Atoms/MyPageInfoModal/MypageInfoModal';
import ConnectApi from '../../../Module/ConnectApi';
import TabBar from '../../TabBar/TabBar';
import { ToastContainer, toast } from 'react-toastify';
import './AdminUser.css'
const AdminUser=()=>{
    const [viewInputModal, setViewInputModal] = useState<string>(''),
        [userWaitingList, setUserWaitingList] = useState<userFullInfoList>([]),
        [userList, setUserList] = useState<userFullInfoList>([]),
        [, setOriginUserData] = useState<userFullInfoList>([]),
        [userInfo] = useRecoilState (userInfoState),
        token = Cookies.get('accessToken'),
        setUserInfoRecoil = useSetRecoilState(userInfoState),
        [Isrendering, setIsrendering] = useState(false);
        let updatedUserList:userFullInfoList=[];
        let updatedWaitingUserList:userFullInfoList=[];
    
    useEffect(() => {  
        
        setUserListApi(); 
    
    }, [Isrendering]);
// 유저정보 get. 
    function setUserListApi(){
        ConnectApi({ method: 'GET', url: `/v1/api/auth/users` }) 
        .then((res) => {
            let data = res.data; 
            setOriginUserData(data);
            
            data.map((user:any)=>{
                if(user.isVerified === true){ //승인된 회원
                    updatedUserList.push(user);  
                   
                }else{ //미승인된 회원
                    updatedWaitingUserList.push(user);
                   
                };   
            });
         
        })
        .catch((error) => {
            console.error('setUserListApi/ Error occurred:', error);
        });
        setUserList(updatedUserList);
        setUserWaitingList(updatedWaitingUserList);
      

    };
//승인거절 및 기존회원 탈퇴
    function handleDelBtn(userId:number){
        axios({
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'DELETE',
            url: `/v1/api/auth/revoke/${userId}`,
            data: {
              id: userId
            }
          }).then(function (res){
            if(res.status === 200){
                setIsrendering(!Isrendering);
                successNotify('승인 거절 되었습니다.');
            };
          });
    };
//비밀번호 리셋
    function handleResetPwd(userId:number){
        axios({
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'patch',
            url: `/v1/api/auth/reset/${userId}`,
            data: {
              id: userId
            }
          }).then(function (res){
            if(res.status === 200){
                setIsrendering(!Isrendering);
                successNotify('비밀번호가 초기화 되었습니다.');
            };
          });
    };
//가입 승인 클릭 이벤트 및 patch호출
    function patchAdminUser(userId:number){
    axios({
        headers: { 'Authorization': `Bearer ${token}` },
        method: 'patch',
        url: `/v1/api/auth/approval/${userId}`,
        data: {
          id: userId
        }
      }).then(function (res){
        if(res.status === 200){
            setIsrendering(!Isrendering);
            successNotify('가입 승인 되었습니다.');
        };
      });
    };
//사용자가 요청한것을 성공했을때    
    function closeCompForSuccess(){
        setViewInputModal(''); setIsrendering(!Isrendering);
        successNotify('성공적으로 반영 되었습니다.')
    };
//suceess toast
  const successNotify = (errorMsg:string) => toast.success(errorMsg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  });
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
                            <li>{item.user_regdate}</li>
                            <li>
                                <button className='ok' onClick={()=>patchAdminUser(item.uid)}>승인</button>
                                <button className='refuse' onClick={()=>handleDelBtn(item.uid)}>거절</button>
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
                            <li>{item.user_regdate}</li>
                            <li>
                                <button className='resetpwd'  onClick={()=>{setUserInfoRecoil(item); handleResetPwd(item.uid)}}>비밀번호 초기화</button>
                                <button className='edit' onClick={()=>{setViewInputModal('changeOtherUserInfo'); setUserInfoRecoil(item); }}>수정</button> 
                                <button className='delete'onClick={()=>handleDelBtn(item.uid)}>삭제</button>
                            </li>
                        </ul>
                    
                    </div>

                   </>  
                ))}
            </div>
        </div>
        {viewInputModal === 'changeOtherUserInfo' &&
            <div className="overlay"> 
                <MypageInfoModal onClose={closeCompForSuccess} action={viewInputModal} infoDetails={userInfo} /> 
            </div>  
        }
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </div>
    );
};
export default AdminUser;