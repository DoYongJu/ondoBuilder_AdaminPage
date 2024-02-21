import './MypageInfoModal.css';
import { BiX } from "react-icons/bi";
import InputBox from '../../Atoms/InputBox';

const MypageInfoModal=({action, onClose, saveFile, handleSetText}:{action:string, onClose: (event: React.MouseEvent<HTMLButtonElement>) => void,
    saveFile?: (event: React.MouseEvent<HTMLButtonElement>) => void; handleSetText:(e:string)=>void })=>{
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
                <InputBox setText={handleSetText}/>
            </div>
            <div className='footer'> 
                    <button onClick={saveFile}>{saveBtn} </button>
            </div> 
        </div>
    );
};
export default MypageInfoModal;