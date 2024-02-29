import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkpwd, setCheckpwd] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [division, setDivision] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  // useEffect(() => {
  //   setIsPasswordValid(validate());
  // }, [password]);

  useEffect(() => {
    setIsButtonDisabled(!validateNullcheck());
  }, [username, password, tel, email, division]);

  async function setSignUpApi() {
    const param = {
        username: username
        , email: email
        , password: password
        , company: company
        , division: division
        , tel: tel
      };

      await axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'/v1/api/auth/signup',
        headers: {'Content-Type': 'application/json'},
        data: param

      }).then(response => {
        navigate('/SignAccept');

      }).catch((Error)=>{
        console.log(Error)
      });
  };

  //유효성 검사
  const validate= ():boolean =>  {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (passwordRegex.test(password) === true) {

        if (emailRegex.test(email)=== true) {
          return true;
        }else{
          setEmailValid(false);
        };
      
    }else{
      setIsPasswordValid(false);
    }

    return false;
  };

  function validateNullcheck() {
    return !!username && !!password && !!tel && !!email && !!division;
  };

 // 회원가입 클릭 이벤트
 function handleSignUp() {
  if(validate() === true ){
    if (password === checkpwd) {
      setSignUpApi();
    }else{
      alert('비밀번호 불일치');
    }
  }else{
    console.log('유효성 검사 false')
  }

};

  return (
    <div className="screen">
    <div className="div">
    <img className="logo-ondo"  onClick={()=>{ navigate('/SignAccept');}} style={{width:'132px', height:'73px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/>
    
      <div className="overlap">
        <div className="text-wrapper">회원등록</div>
        <div className="line"></div>
        {/* <div className="text-wrapper-2">*</div> */}
        <div className={`frame ${isButtonDisabled ? 'disabled' : ''}`} onClick={isButtonDisabled ? undefined : handleSignUp}>
          <div className="text-wrapper-3">회원 등록</div>
        </div>
        <div className="overlap-group">
          <div className="group-email">  
              <div className="div-wrapper">
              <input className={isEmailValid ? "text-wrapper-4": 'invalid-password'}  type="email" placeholder="이메일을 입력해 주세요." value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              {!isEmailValid && <div className="label">
                <p className="text-wrapper">이메일 양식을 지켜 입력하세요.</p>
              </div>}
              <div className="text-wrapper-7">이메일</div>
              <div className="text-wrapper-8">*</div>  
          </div>
         
        </div> 
        {/* <div className="overlap-group">
          <input className="text-wrapper-4" type="email" placeholder="Input your Email." value={email} onChange={e => setEmail(e.target.value)}/>
        </div> */}
        {/* <div className="text-wrapper-5">이메일</div> */}
        <div className="overlap-2">  
          <div className="group">  
            <div className="div-wrapper">
             <input className={isPasswordValid ? "text-wrapper-6": 'invalid-password'} type="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={e => setPassword(e.target.value)}/>  
            </div>
            {!isPasswordValid && <div className="label">
              <p className="text-wrapper">대소문자, 숫자, 특수문자를 포함한 8자 이상 입력하세요.</p>
            </div>}
            <div className="text-wrapper-7">비밀번호</div>
            <div className="text-wrapper-8">*</div>   
          </div>
          
         
        </div>
        <div className="overlap-3">
          <div className="group">
            <div className="div-wrapper">
              <input className="text-wrapper-6" type="password" placeholder="비밀번호를 입력해 주세요." value={checkpwd} onChange={e => setCheckpwd(e.target.value)}/>
            </div>
            <div className="text-wrapper-7">비밀번호 확인</div>
          </div>
          <div className="text-wrapper-9">*</div>
        </div>
        <div className="overlap-4">
          <input className="text-wrapper-4" type="username" placeholder="이름을 입력해주세요." value={username} onChange={e => setUsername(e.target.value)} /> 
        </div>
        <div className="text-wrapper-10">이름</div>
        <div className="overlap-5">
          <input className="text-wrapper-4" type="company" placeholder="회사명을 입력해 주세요." value={company} onChange={e => setCompany(e.target.value)} />
        </div>
        <div className="text-wrapper-11">소속</div>
        <div className="overlap-6">
          <input className="text-wrapper-4" type="text" placeholder="소속을 입력해주세요." value={division} onChange={e => setDivision(e.target.value)} />
        </div>
        <div className="text-wrapper-13">전화번호</div>
        <div className="overlap-7">
          <input className="text-wrapper-4" type="phone" placeholder="전화번호를 입력해주세요." value={tel} onChange={e => setTel(e.target.value)} /> 
        </div>
        <div className="text-wrapper-12">회사</div>
        
        <div className="text-wrapper-14">*</div>
        <div className="text-wrapper-15">*</div>
        <div className="text-wrapper-16">*</div>
        <div className="text-wrapper-17">*</div>
      </div>
    </div>
  </div>
  
  );
}
export default SignUp;
