import { isDisabled } from '@testing-library/user-event/dist/utils';
import './InputBox';
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

interface InputBoxProps {
  type:string,
  isPwd?:boolean,
  handleTheTextChange:React.ChangeEventHandler<HTMLInputElement>,
  title:string
  placeholder?:string,
  value?:string,
  className?:string,
  isDisabled?:boolean,
  inputValue?:string, 

};

const InputBox: React.FC<InputBoxProps>=({handleTheTextChange,title,placeholder,value, type, className, isPwd, isDisabled, inputValue})=>{

  const [showPassword, setShowPassword] = useState(isPwd);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function addHyphen(e:any) { //- 자동 추가 및 숫자만 기입
    let phone = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    let formattedPhone = '';
    
    if (phone.length < 4) {
        formattedPhone = phone;
    } else if (phone.length < 7) {
        formattedPhone = phone.substring(0, 3) + '-' + phone.substring(3);
    } else if (phone.length < 11) {
        formattedPhone = phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6);
    } else {
        formattedPhone = phone.substring(0, 3) + '-' + phone.substring(3, 7) + '-' + phone.substring(7, 11);
    }
    
    e.target.value = formattedPhone;
  };

  return(
    <div className='oneInputArea'>
        <div className='urlTitle'><ul>{title}</ul></div>
        <div className='urlBody' >
          {type === 'text' && isDisabled === false && <input type={type}  className={className} value={value} placeholder={placeholder} onChange={handleTheTextChange} />} 
          {type === 'text' && isDisabled === true && <input type={type}  className={className} value={inputValue} placeholder={placeholder} onChange={handleTheTextChange} disabled/>} 

          {type === 'tel' &&<input type={type}  className={className} value={value} placeholder={placeholder} onChange={handleTheTextChange} maxLength={13} onInput={(e)=>addHyphen(e)}/>} 
          
          {type === 'password' &&
            <>
            <input  type={showPassword ? 'password':'text'}  className={className} value={value} placeholder={placeholder} onChange={handleTheTextChange} />
            <span className='eyesIcon' onClick={togglePasswordVisibility}>
              {showPassword ? <FaRegEye  size={20}/> : <RiEyeCloseLine size={20} />}
            </span>
            </>
          } 
        </div>
    </div>
  );  
};
export default InputBox;