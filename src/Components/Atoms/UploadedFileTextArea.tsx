
const UploadedFileTextArea=({totalCount,currentCount, handleTextChange, title, placeholder}:{
    totalCount?:number,currentCount?:number, title:string,placeholder:string, handleTextChange:React.ChangeEventHandler<HTMLTextAreaElement>})=>{
    return (    
    <div className='FileUploadInfo'>
        <div className='FileUploadtitle'>
            <ul>{title}</ul>
            
        </div>
        <div className='fileTextArea'>
            <textarea  maxLength={totalCount} onChange={handleTextChange} placeholder={placeholder}></textarea>
            {totalCount &&
                <span>{currentCount}/{totalCount}(글자수)</span>
            }
        </div>
    </div>
);
};
export default UploadedFileTextArea;