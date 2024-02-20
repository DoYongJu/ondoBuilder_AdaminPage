
const UploadedFileName=({filename, fileType}:{filename:string, fileType:string})=>{
    return(
        <div className='FileUploadtitle'>
        <div className='key'>
            <ul>파일 이름</ul>
            <ul>확장자</ul>
        </div>
        <div className='value'>
            <ul>{filename}</ul>
            <ul>{fileType}</ul>
        </div>
    </div>
    );
};
export default UploadedFileName;