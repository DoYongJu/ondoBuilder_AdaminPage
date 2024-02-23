import './InputBox';
const InputBox=({handleTheTextChange,title,placeholder}:{handleTheTextChange:React.ChangeEventHandler<HTMLInputElement>, title:string, placeholder:string})=>{
  return(
    <div className='oneInputArea'>
        <div className='urlTitle'><ul>{title}</ul></div>
        <div className='urlBody'>
        <div><input type="text"  placeholder={placeholder} onChange={handleTheTextChange} /></div>
        </div>
    </div>
  );  
};
export default InputBox;