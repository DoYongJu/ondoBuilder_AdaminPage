const InputBox=({handleTheTextChange}:{handleTheTextChange:React.ChangeEventHandler<HTMLInputElement>})=>{
  return(
    <div className='oneInputArea'>
        <div className='urlTitle'><ul>URL 입력</ul></div>
        <div className='urlBody'>
        <div><input type="text"  placeholder="URL을 입력 해주세요." onChange={handleTheTextChange} /></div>
        </div>
    </div>
  );  
};
export default InputBox;