import { atom } from 'recoil';
import { userInfoType, userPwdType, userFullInfoType  } from './Models';
export const usernameState = atom({
  key: 'username',
  default: '',
});

export const tokenState = atom({
  key: 'token',
  default: '',
});

export const searchState = atom({
  key:'search',
  default:'',
});

export const hubClassfiyState = atom({
  key:'type',
  default:'',
});

export const userInfoState = atom<userInfoType>({
  key: 'userInfoState',
  default: {
    email: '',
    company: '',
    username: '',
    division: '',
    tel: ''
  },
});

export const userPwdState = atom<userPwdType>({
  key: 'userPwdState',
  default: {
    originPwd: '',
    newPwd:'',
    checkPwd:'',
  },
});
export const userFullInfo = atom<userFullInfoType>({
  key: 'userPwdState',
  default: {
    uid: -1,
    email:  '',
    tel:  '',
    company: '',
    division:'',
    username: '',
    user_regdate: '',
  },
});


