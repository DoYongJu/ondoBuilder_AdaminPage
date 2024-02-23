import './MypageInfoModal.css';
import { BiX } from "react-icons/bi";
import InputBox from '../InputBox/InputBox';
import '../InputBox/InputBox.css'

const MypageInfoModal=({action, onClose, saveFile, handleSetText}:{action:string, onClose: (event: React.MouseEvent<HTMLButtonElement>) => void,
    saveFile?: (event: React.MouseEvent<HTMLButtonElement>) => void; handleSetText:(e:any)=>void })=>{
    let title:string ='';
    let saveBtn:string ='';

    switch(action){
        case 'changepwd': title='비밀번호 변경'; saveBtn='비밀번호 변경하기'; break;
        default: title= '내 정보 변경';saveBtn='저장'; break; 
    };

    return(
        <div className="MypageInfoModal">
            <div className="header">
                <ul>{title}</ul>
                <button  onClick={onClose}><BiX size={20}  /></button>
            </div>
            <div className='body'>
                <div><InputBox title='기존 비밀번호' placeholder='기존 비밀번호를 입력하세요.' handleTheTextChange={handleSetText}/></div>
                <div><InputBox title='신규 비밀번호' placeholder='신규 비밀번호를 입력하세요.' handleTheTextChange={handleSetText}/></div>
                <div><InputBox title='신규 비밀번호 확인' placeholder='신규 비밀번호를 다시 입력하세요.' handleTheTextChange={handleSetText}/></div>
            </div>
            <div className='footer'> 
                    <button onClick={saveFile}>{saveBtn} </button>
            </div> 
        </div>
    );
};
export default MypageInfoModal;