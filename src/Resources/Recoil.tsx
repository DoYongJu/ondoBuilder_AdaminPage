import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { userInfoType, userPwdType, MyObject, userFullInfoType,
  hubInfo,dataByDoc,dataByVideo,dataByUrl,dataByImg } from './Models';

const { persistAtom } = recoilPersist();

export const usernameState = atom({
  key: 'username',
  default: '',
});

export const tokenState = atom({
  key: 'token',
  default: '',
});

export const searchState = atom({
  key:'searchWord',
  default:'default',
});

export const hubClassfiyState = atom({
  key:'type',
  default:'',
});
export const ActiveHubFileListState = atom({
  key:'list',
  default:false,
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
// export const userFullInfoState = atom<userFullInfoType>({
//   key: 'userFullInfoState',
//   default: {
//     uid: -1,
//     email:  '',
//     tel:  '',
//     company: '',
//     division:'',
//     username: '',
//     user_regdate: '',
//     isVerified: false,
//   },
// });


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
  effects_UNSTABLE: [persistAtom],
});
export const hubInfoState = atom<hubInfo>({
  key: 'hubInfoState',
  default: {
    hub_id:-1,
    hub_name: '',
    datahub_regdate: '',
    datahub_upddate: '',
    hub_description: '',
  },
  effects_UNSTABLE: [persistAtom],
});
export const syncHubInfoState = selector({
  key: 'syncHubInfoState',
  get: ({get}) => {
    return get(hubInfoState);
  },
});

export const dataByDocState = atom<dataByDoc>({ 
  key: 'dataByDocState',
  default: {
    hub_id:-1,
    doc_no:-1,
    file_name:'',
    file_description:'',
    file_regdate:'',
    file_upddate:'',
    file_size:'',
    file_prompt:'',
    download_url:'',
    writer:'',
    }
});
export const docDetailsState = selector({
  key: 'docDetailsState',
  get: ({get}) => {
    return get(dataByDocState);
  },
});  

export const dataByVideoState = atom<dataByVideo>({ 
  key: 'dataByVideoState',
  default: {
    hub_id:-1,
    video_no:-1,
    file_name:'',
    file_description:'',
    file_regdate:'',
    file_upddate:'',
    file_size:'',
    file_tag:'',
    download_url:'',
    writer:'',
    }
});
export const videoDetailsState = selector({
  key: 'videoDetailsState',
  get: ({get}) => {
    return get(dataByVideoState);
  },
});

export const dataByImgState = atom<dataByImg>({ 
  key: 'dataByImgState',
  default: {
    hub_id:-1,
    image_no:-1,
    file_name:'',
    file_description:'',
    file_regdate:'',
    file_upddate:'',
    file_size:'',
    file_tag:'',
    download_url:'',
    writer:'',
    turn:-1,
    casosel_name:'',
    carosel_id:-1,

  }
});
export const imgDetailsState = selector({
  key: 'imgDetailsState',
  get: ({get}) => {
    return get(dataByImgState);
  },
});
export const dataByUrlState = atom<dataByUrl>({ 
  key: 'dataByVideoState',
  default: {
    hub_id:-1,
    url_no:-1,
    url_description:'',
    url_regdate:'',
    url_upddate:'',
    writer:'',
    url_name:'',
    url_tag:'',
    }
});
export const urlDetailsState = selector({
  key: 'urlDetailsState',
  get: ({get}) => {
    return get(dataByUrlState);
  },
});

export const syncSearchTextState = selector({
  key: 'searchState',
  get: ({get}) => {
    return get(searchState);
  },
});

