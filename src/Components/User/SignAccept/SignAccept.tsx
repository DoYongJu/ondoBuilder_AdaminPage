import React from 'react';
import './SignAccept.css';
import { useNavigate } from 'react-router-dom';

function SignAccept() {
  const navigate = useNavigate();

  return (
    <div className="SignAcceptscreen">
      <div className="group-wrapper">
        <div className="group">
        <img className="logo-ondo" onClick={()=>{ navigate('/Login');}} style={{width:'132px', height:'73px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/>
          <div className="overlap-group">
            <div className="frame" onClick={()=>{ navigate('/Login');}} >
              <div className="text-wrapper">돌아가기</div>
            </div>
            <p className="data-builder">
              Data builder의 접근을 위해 관리자의 가입 승인을 대기중입니다. <br />
              자세한 내용은 관리자의에게 문의해 주세요
            </p>
            <div className="div">회원등록이 완료되었습니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignAccept;
