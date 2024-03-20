import React, {useState, useEffect} from 'react';
const UploadedFileTextArea=({totalCount,currentCount, handleTextChange, title, placeholder,inputValue }:{
    totalCount?:number,currentCount?:number, title:string,placeholder:string, handleTextChange:React.ChangeEventHandler<HTMLTextAreaElement>, inputValue?:string})=>{
//     const [turn, setTurn] = useState(inputValue?(inputValue?.length):(currentCount));
// useEffect(()=>{
//     setTurn(currentCount);
// },[currentCount]);
    return (    
    <div className='FileUploadInfo'>
        <div className='FileUploadtitle'>
            <ul>{title}</ul>
            
        </div>
        <div className='fileTextArea'>
            <textarea  maxLength={totalCount} onChange={handleTextChange} placeholder={placeholder} defaultValue={inputValue}></textarea>
            {totalCount &&
                <span>{currentCount}/{totalCount}(글자수)</span>
            }
        </div>
    </div>
);
};
export default UploadedFileTextArea;