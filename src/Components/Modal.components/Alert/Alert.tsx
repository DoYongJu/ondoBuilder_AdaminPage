import './Alert.css';

interface AlartProps {
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
const Alert: React.FC<AlartProps>=({onClose})=>{
    return(
     
            <div className="Alert">
                <div className="infoArea">
                    <div className='title'><span>페이지 나가기</span></div>
                    <div className='info'><span>저장하지 않은 수정사항은 전부 사라집니다. 정말 현재 페이지를 나가시겠습니까?</span></div>
                </div>
                <div className="buttonArea">
                    <div className='cancel'>  <button onClick={onClose}>취소</button></div>
                    <div className='out'>  <button onClick={onClose}>나가기</button></div>
                </div>
            </div>
   
    );
};
export default Alert;