import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { usernameState, tokenState } from '../../../Resources/Recoil';



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    setTokenRecoil = useSetRecoilState(tokenState);
  
  async function loginApi() {
      const sendParam = {
        email: email,
        password: password,
      };
      console.log(process.env.REACT_APP_API+'/v1/api/auth/signin')
      await axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'/v1/api/auth/signin',
        headers: {"accept": 'application/json', 'Content-Type': 'application/json'},
        data: sendParam
        
      }).then(res => {
        // setusername(response.data.user_name);
        setTokenRecoil(res.data.accessToken);
        Cookies.set('accessToken', res.data.accessToken);
        Cookies.set('username', res.data.user_name); 
        console.log(res.data);
        navigate('/dashBoard');
     
        
      }).catch(error =>{
        if (error.response && error.response.status === 400 && error.response.data.message === "user_verify value Error"){
          navigate('/SignAccept');
        };
        console.log('error:'+ error);
       
      });

  };

  function handleLogin() {
    if ((email || password) !== '') {
      loginApi();
    };

    if (email === '') {
      alert(' email을 입력하세요');
    } else if (password === '') {
      alert(' password을 입력하세요');
    };

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
          <input className="overlap" type="text" placeholder="이메일을 입력해 주세요." value={email} onChange={e => setEmail(e.target.value)}/>
          <input  className="overlap" type="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        
        <div className="frame" onClick={handleLogin}>로그인 </div>
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
