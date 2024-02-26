import './InputBox';
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";

interface InputBoxProps {
  pwdType?:boolean,
  handleTheTextChange:React.ChangeEventHandler<HTMLInputElement>,
  title:string
  placeholder?:string,
  value?:string,
  className?:string,

};
const InputBox: React.FC<InputBoxProps>=({handleTheTextChange,title,placeholder,value, pwdType, className})=>{
  const [showPassword, setShowPassword] = useState(pwdType);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return(
    <div className='oneInputArea'>
        <div className='urlTitle'><ul>{title}</ul></div>
        <div className='urlBody' >
          <input type={showPassword ?("password"):("text")}  className={className} value={value} placeholder={placeholder} onChange={handleTheTextChange} />
          {pwdType &&
            <span className='eyesIcon' onClick={togglePasswordVisibility}>
              {showPassword ? <FaRegEye  size={20}/> : <RiEyeCloseLine size={20} />}
            </span>
          } 
        </div>
    </div>
  );  
};
export default InputBox;