import './Alert.css';

interface AlartProps {
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onCustomBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
    action:string; 
  };
const Alert: React.FC<AlartProps>=({onClose, onCustomBtn, action})=>{
    let title='';
    let content='';

    switch(action){
        case 'dataHub': title='페이지 나가기'; content='저장하지 않은 수정사항은 전부 사라집니다. 정말 현재 페이지를 나가시겠습니까?';
            break;
        case 'uploadFile': title='페이지 나가기'; content='저장하지 않은 수정사항은 전부 사라집니다. 정말 현재 페이지를 나가시겠습니까?';
            break;
        default:
            break;
    }
    return(
     
            <div className="Alert">
                <div className="infoArea">
                    <div className='title'><span>{title}</span></div>
                    <div className='info'><span>{content}</span></div>
                </div>
                <div className="buttonArea">
                    <div className='cancel'>  <button onClick={onClose}>취소</button></div>
                    <div className='out'>  <button onClick={onCustomBtn}>나가기</button></div>
                </div>
            </div>
   
    );
};
export default Alert;