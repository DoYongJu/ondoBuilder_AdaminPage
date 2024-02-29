import './MypageInfoModal.css';
import { useState, useEffect } from 'react';
import { BiX } from "react-icons/bi";
import InputBox from '../InputBox/InputBox';
import '../InputBox/InputBox.css'
import ConnectApi from '../../../Module/ConnectApi';
import { userInfoType } from '../../../Resources/Models';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoState, userPwdState } from '../../../Resources/Recoil'

interface MypageProps {
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    action:string; 
    infoDetails?:userInfoType;
};

const MypageInfoModal: React.FC<MypageProps>=({action, onClose, infoDetails})=>{

    let title:string ='';
    let saveBtn:string ='';

    const [userInfo] = useRecoilState (userInfoState);
    const [userPwdInfos] = useRecoilState (userPwdState);
    const setUserInfoRecoil = useSetRecoilState(userInfoState);
    const setUserPwdRecoil = useSetRecoilState(userPwdState),
    [isButtonDisabled, setIsButtonDisabled] = useState(true),
    [isFormValid, setIsFormValid] = useState(true);

    switch(action){
        case 'changepwd': title='비밀번호 변경'; saveBtn='비밀번호 변경하기'; break;
        case 'changeInfo': title='내 정보 변경'; saveBtn='저장'; break;
        default: title= '내 정보 변경';saveBtn='저장'; break; 
    };

    useEffect(() => {
        setIsButtonDisabled(isFormValid); //false가 들어가야 함
    }, [isFormValid]);
    
    const pwdValidate = (newPwd:string, checkPwd:string) :boolean =>{
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(passwordRegex.test(newPwd)){
            if(newPwd === checkPwd){
                return true;
            }
        }
        return false;
    };

    const handleSetPwdInfo=(e: React.ChangeEvent<HTMLInputElement>) => {
        const { className, value } = e.target;
        let isPass=false;
        let isFormNowValid = false
        setUserPwdRecoil(prevState => {
            let updatedState = { ...prevState, [className]: value };
            isFormNowValid = updatedState.originPwd !== '' && updatedState.newPwd !== '' && updatedState.checkPwd !== '';
            isPass = pwdValidate(updatedState.newPwd, updatedState.checkPwd);
            console.log('isPass: '+ isPass);
           
        return updatedState;
        });

        if(isPass){
            setIsFormValid(!isFormNowValid);
        };
        
    };

    const handleSetUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { className, value } = e.target;
        let isFormNowValid = false
        setUserInfoRecoil(prevState => {
            let updatedState = { ...prevState, [className]: value };
            isFormNowValid = updatedState.username !== '' && updatedState.tel !== '' && updatedState.company !== '' && updatedState.division !== '';
            setIsFormValid(!isFormNowValid);
           
        return updatedState;
        });
      };


    function saveFile(){
        switch(saveBtn){
            case '비밀번호 변경하기': requestChangePwdAPi(); break;
            case '저장': requestChangeUserInfoApi(); break;
            default:  break; 
        };
    };

    function requestChangeUserInfoApi(){
        let sendParam={
            username:infoDetails?.username,
            company: infoDetails?.company,
            division:infoDetails?.division,
            tel:infoDetails?.tel,
        }

        ConnectApi({ method: 'PATCH', url: `/v1/api/auth/user`, sendParam:sendParam })
        .then((res) => {
            let data = res.data;
            if(data.result === true){
                const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                onClose(fakeEvent);
            }
        })
        .catch((error) => { 
            console.error('requestChangeUserInfoApi/ Error occurred:', error);
            alert('비밀번호 변경 실패');
        });
    };

    function requestChangePwdAPi(){ //비밀번호 변경 
        let sendParam={
            nowPassword: userPwdInfos.originPwd,
            newPassword: userPwdInfos.newPwd,
        };

        ConnectApi({ method: 'PATCH', url: `/v1/api/auth/password`, sendParam:sendParam })
        .then((res) => {
            let data = res.data;
            if(data.result === true){
                const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                onClose(fakeEvent);
            }
        })
        .catch((error) => {
            console.error('requestChangePwdApi/ Error occurred:', error);
        });
    };
    
    return(
        <div className="MypageInfoModal">
            <div className="header">
                <ul>{title}</ul>
                <button  onClick={onClose}><BiX size={20}  /></button>
            </div>
            <div className='body'>
                {action === 'changepwd' && 
                <>
                    <div><InputBox isPwd = {true} type='password' className='originPwd' title='기존 비밀번호' placeholder='기존 비밀번호를 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                    <div><InputBox  isPwd = {true} type='password' className='newPwd' title='신규 비밀번호' placeholder='신규 비밀번호를 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                    <div><InputBox  isPwd = {true} type='password' className='checkPwd' title='신규 비밀번호 확인' placeholder='신규 비밀번호를 다시 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                </>
                }
                {action === 'changeInfo' &&  infoDetails &&
                <>
                    <div><InputBox className='username' type='text' title='이름'  value={userInfo.username} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='tel' type='tel' title='전화번호' value={userInfo.tel} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='company'type='text' title='회사명' value={userInfo.company} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='division' type='text' title='소속' value={userInfo.division} handleTheTextChange={handleSetUserInfo}/></div>
                </>
                }
               
            </div>
            <div className='footer' > 
                    <button className={`changeBtn ${isButtonDisabled ? 'disabled' : ''}`}  onClick={isButtonDisabled ? undefined : saveFile } >{saveBtn} </button>
            </div> 
          
        </div>
    );
};
export default MypageInfoModal;