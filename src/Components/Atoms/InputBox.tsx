const InputBox=({setText}:{setText:(e:string)=>void})=>{
  return(
    <div className='oneInputArea'>
        <div className='title'><ul>URL 입력</ul></div>
        <div className='body'>
        <div><input type="text"  placeholder="URL을 입력 해주세요." onChange={(e)=>{setText(e.target.value)}} /></div>
        </div>
    </div>
  );  
};
export default InputBox;