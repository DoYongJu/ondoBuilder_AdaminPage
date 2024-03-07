import { atom } from 'recoil';
import { userInfoType, userPwdType, MyObject, userFullInfoType,fileNoAndHubId  } from './Models';
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
export const userFullInfoState = atom<userFullInfoType>({
  key: 'userFullInfoState',
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
export const fileNoSideBarState = atom<fileNoAndHubId>({
  key:'no',
  default:{
    hub_id:-1,
    file_no:-1
  },
});
export const fileNoState = atom({
  key:'file_no',
  default: -1,
  
});

//대쉬보드에서 set-> 이후 step에서 get
export const MyObjectsState = atom<MyObject>({
  key: 'MyObjectsState',
  default: {
    hub_id:-1,
    hub_name: '',
    datahub_regdate: '',
    datahub_upddate: '',
    hub_description: '',
    doc_count: -1,
    image_count: -1,
    video_count: -1,
    url_count: -1,
  },
});

