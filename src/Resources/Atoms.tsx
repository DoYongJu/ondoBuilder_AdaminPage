import { atom } from 'recoil';
import { Users } from './Models';

// export const usersInfoState = atom<Users[]>({
//   key: 'users',
//   default: [
//     {
//       userId: 1,
//       username: 'Admin',
//       password: 'a',
//     },

//     {
//       userId: 2,
//       username: '도용주',
//       password: 'a',
//     },
//   ],
// });
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

