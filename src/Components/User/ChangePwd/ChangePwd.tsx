import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePwd.css';
import ConnectApi from '../../../Module/ConnectApi';

function ChangePwd() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkPwd, setCheckPwd] = useState('');

  function changePwdApi() {
    const sendParam = {
      password: password,
    };

    ConnectApi({ method: 'PATCH', url: '/v1/api/auth/password', sendParam: sendParam })
      .then(() => {
       navigate('/dashBoard');
      })
      .catch((error) => {
        // API 요청이 실패했을 때 처리할 로직
        console.error('Error occurred:', error);
      });
  };

  function validatePassword() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(' 비밀번호 조건을 충족하여 주세요.');
      
    } else {
      return true;
    };
  };
  
  function validateNullcheck() {
    if (password === '') {
      alert('비밀번호를 입력하세요');

    } else if (checkPwd === '') {
      alert('비밀번호 확인을 입력하세요');

    } else {
      return true;
    };
  };

   function handleChangePwd() {
    let booleanPwd = validatePassword();
    let booleanNull = validateNullcheck();
    
    if ((booleanPwd && booleanNull) === true) {
      changePwdApi();
    };
  };

  return (
    <div className="ChangePwd">
      <div className="group-wrapper">
       <div className='imgArea'>
        <img className="logo-ondo" onClick={()=>{ navigate('/login');}} style={{width:'132px', height:'73px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/>
       </div>
        <div className="overlap-group">
            <div className='titleArea'>
              <ul>
                <span>비밀번호 변경</span>
                <span>Data builder 사용을 위해 비밀번호를 변경해주세요</span>
              </ul>
            </div>
            <div className='bodyArea'>
                  <div className='pwdArea'>
                    <ul>
                      <span>비밀번호</span>
                      <input type='text' onChange={(e)=>setPassword(e.target.value)} placeholder='영문 숫자 특수문자를 포함한 8자 이상의 비밀번호를 입력하세요.'></input>
                    </ul>
                  </div>
                  <div className='pwdArea'>
                    <ul>
                      <span>비밀번호 확인</span>
                      <input type='text'onChange={(e)=>setCheckPwd(e.target.value)} placeholder='비밀번호를 다시 입력하세요.'></input>
                    </ul>
                  </div>
            </div>
            <button className="changePwdBtn" onClick={handleChangePwd}><span>비밀번호 변경</span></button>
        </div>
      </div>
  </div>
  );
}
export default ChangePwd;
