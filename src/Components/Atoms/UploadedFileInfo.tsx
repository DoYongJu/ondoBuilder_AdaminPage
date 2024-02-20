
const UploadedInfo=({totalCount,currentCount, handleTextChange}:{totalCount:number,currentCount:number, handleTextChange:React.ChangeEventHandler<HTMLTextAreaElement>})=>{
    return (    
    <div className='FileUploadInfo'>
        <div className='FileUploadtitle'>
            <ul>파일 설명</ul>
            
        </div>
        <div className='fileTextArea'>
            <textarea  maxLength={totalCount} onChange={handleTextChange} placeholder={'입력하세요.'}></textarea>
            <span>{currentCount}/{totalCount}(글자수)</span>
        </div>
    </div>
);
};
export default UploadedInfo;