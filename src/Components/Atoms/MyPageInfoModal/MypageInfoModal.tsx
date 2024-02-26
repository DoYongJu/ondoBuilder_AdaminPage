import './MypageInfoModal.css';
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
    const setUserPwdRecoil = useSetRecoilState(userPwdState);

    switch(action){
        case 'changepwd': title='비밀번호 변경'; saveBtn='비밀번호 변경하기'; break;
        case 'changeInfo': title='내 정보 변경'; saveBtn='저장'; break;
        default: title= '내 정보 변경';saveBtn='저장'; break; 
    };

    const handleSetPwdInfo=(e: React.ChangeEvent<HTMLInputElement>) => {
        const { className, value } = e.target;
        setUserPwdRecoil(prevState => ({
          ...prevState,
          [className]: value,
        }));
    };

    const handleSetUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { className, value } = e.target;
        setUserInfoRecoil(prevState => ({
          ...prevState,
          [className]: value,
        }));
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
            let data = res.data; //result: true => 02.26작성. 추후 api테스트 후 추가 개발 필요. 

        })
        .catch((error) => {
            console.error('requestChangeUserInfoApi/ Error occurred:', error);
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
                console.log('dddddd'); //02.26 => 몽고 디비 꺼져있음. 대리님 문의
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
                    <div><InputBox pwdType = {true}  className='originPwd' title='기존 비밀번호' placeholder='기존 비밀번호를 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                    <div><InputBox  pwdType = {true} className='newPwd' title='신규 비밀번호' placeholder='신규 비밀번호를 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                    <div><InputBox  pwdType = {true} className='checkPwd' title='신규 비밀번호 확인' placeholder='신규 비밀번호를 다시 입력하세요.' handleTheTextChange={handleSetPwdInfo}/></div>
                </>
                }
                {action === 'changeInfo' &&  infoDetails &&
                <>
                    <div><InputBox className='username' title='이름'  value={userInfo.username} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='tel' title='전화번호' value={userInfo.tel} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='company' title='회사명' value={userInfo.company} handleTheTextChange={handleSetUserInfo}/></div>
                    <div><InputBox className='division' title='소속' value={userInfo.division} handleTheTextChange={handleSetUserInfo}/></div>
                </>
                }
               
            </div>
            <div className='footer'> 
                    <button onClick={saveFile}>{saveBtn} </button>
            </div> 
        </div>
    );
};
export default MypageInfoModal;