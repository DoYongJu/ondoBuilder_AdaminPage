import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { usernameState, tokenState } from '../../../Resources/Recoil';



function Login() {
  const navigate = useNavigate();
  const [errorMsgEmail, setErrorMsgEmail] = useState('');
  const [errorMsgPwd, setErrorMsgPwd] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true),
    [password, setPassword] = useState(''),
    setTokenRecoil = useSetRecoilState(tokenState);
  
    useEffect(() => {
      setIsButtonDisabled(validateNullcheck());
    }, [email, password]); 

  async function loginApi() {
      const sendParam = {
        email: email,
        password: password,
      };
     
      await axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'/v1/api/auth/signin',
        headers: {"accept": 'application/json', 'Content-Type': 'application/json'},
        data: sendParam
        
      }).then(res => {
        setTokenRecoil(res.data.accessToken);
        Cookies.set('accessToken', res.data.accessToken);
        Cookies.set('username', res.data.user_name); 
        navigate('/dashBoard');
     
        
      }).catch(error =>{
        if (error.response && error.response.status === 400 && error.response.data.message === "user_verify value Error"){
          navigate('/SignAccept');
        }else if( error.response.data.statusCode === 401 && error.response.data.message === "login failed"){ //비밀번호 오류
          setErrorMsgPwd('비밀번호 오류입니다. 비밀번호를 다시 입력해주세요.')
          console.log(errorMsgPwd);
        }else if( error.response.data.statusCode === 400 && error.response.data.message === "User not found"){ //이메일 오류, 미등록회원
          setErrorMsgEmail('등록되지 않은 회원입니다. 이메일을 다시 입력해주세요.');
          console.log(errorMsgEmail);
        };
       
      });

  };

  const validateNullcheck= ():boolean =>  {
    setErrorMsgPwd('');
    setErrorMsgEmail('');

    if (email !== '') {
        if (password !== '') {
          return false;
        };
    };

    return true;
  };


  return (
  <div className="Loginscreen">
  <div className="div">
    <div className='logo-ondo'>
        <img style={{width:'132px', height:'73px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/>
    </div>
    <div className="overlap-Logingroup">
      <div className='loginArea'>
        <div className="wrapper-4">로그인</div>
        
        <div className='inputArea'>
          <input className="overlap" type="text" placeholder="이메일을 입력해 주세요." value={email} onChange={e => setEmail((e.target.value).trim)}/>
          {errorMsgEmail && <span className='errorMsg'>{errorMsgEmail}</span> }
          <input  className="overlap" type="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={e => setPassword((e.target.value).trim)}/>
          {errorMsgPwd && <span className='errorMsg'>{errorMsgPwd}</span> }
        </div>
        
        <div className={`frame ${isButtonDisabled ? 'disabled' : ''}`} onClick={isButtonDisabled ? undefined : loginApi }>로그인 </div>
        <p className="p">
          <span className="text-wrapper">
            아직 커뮤니티에 가입하지 않으셨나요? <br />
            여기서 간편하게{" "}
          </span>
          <span className="span"><Link to="/SignUp" style={{ textDecoration: 'none' , color:'#105AEB'}} > 회원등록</Link></span>
          <span className="text-wrapper">을 할 수 있습니다.</span>
        </p>
      
      </div>
      
    </div>
  </div>
  </div>
  );
}
export default Login;
