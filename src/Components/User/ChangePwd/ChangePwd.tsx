import React, { useState } from 'react';

function ChangePwd() {
  const [password, setPassword] = useState('');
  const [checkPwd, setCheckPwd] = useState('');

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

  //api 호출
  async function ChangePwdApi() {
    //수정예정: 토큰 정보 담아 axios api 호출: /v1/api/auth/password
  };

  function handleChangePwd() {
    let booleanPwd = validatePassword();
    let booleanNull = validateNullcheck();
    
    if ((booleanPwd && booleanNull) === true) {
      ChangePwdApi();
    };
  };

  return (
    <div className="ChangePwd">
      {' '}
      <p>비밀번호 초기화</p>
      <p>
        귀하의 개인정보 보호는 우리의 최우선 과제입니다. 새로운 비밀번호를 통해
        계정을 더욱 관리해 보세요.
      </p>
      <input type="text" value="jointree@gmail.com" disabled />
      <input type="password" placeholder="새 비밀번호" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="password" placeholder="새 비밀번호 확인" value={password} onChange={e => setCheckPwd(e.target.value)}/>
      <div className="annotation_field">
        <li>
          새로운 비밀번호를 입력해 주세요. 안전을 위해 비밀번호는 8자 이상이며,
          문자,숫자, 특수문자를 조합해야 합니다. 입력하신 새 비밀번호를 한 번 더
          확인해 주세요.
        </li>
        <li>
          {' '}
          계정을 잠금 해제한 후 계정 설정을 검토하고 모든 정보가 최신 상태이며
          안전한지 확인하는 것이 좋습니다.
        </li>
      </div>
      <input type="submit" onClick={handleChangePwd} value="비밀번호 변경하기" />
    </div>
  );
}
export default ChangePwd;
