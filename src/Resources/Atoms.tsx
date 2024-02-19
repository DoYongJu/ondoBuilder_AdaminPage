import { atom } from 'recoil';
import { Users } from './Models';
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


