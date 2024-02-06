import React,{useState} from 'react';
//하고 싶으나 시간상 이유로 미룸.. 시간 날때 해봐야지
type handleInputProps = {
    handleInput: (e: any) => void;
    type:string;
    placeholder:string
    value:string
  };
const InputTag : React.FC<handleInputProps> = ({type, placeholder, value, handleInput})=>{
    const [shpwType, setShpwType] = useState(type);
    const [showPlaceholder, setShowPlaceholder] = useState(placeholder);
    const [text, setText] = useState('');
    
    const render=()=>{
        <input type={type} placeholder={showPlaceholder} value={text} onChange={e => handleInput(e.target.value)}/>

        // if(shpwType === 'email'){
        //     return (  <input type="email" placeholder={showPlaceholder} value={text} onChange={e => handleInput(e.target.value)}/>);
        // }else if(shpwType === 'password'){
        //     return (  <input type="password" placeholder={showPlaceholder} value={text} onChange={e => handleInput(e.target.value)}/>);
        // }
    }

return(
  <>{render()}</>
);
};
export default InputTag;