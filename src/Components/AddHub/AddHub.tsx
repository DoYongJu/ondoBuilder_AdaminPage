import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './AddHub.css';
const AddHub=()=>{
    const navigate = useNavigate();
    const totalCount = 100;
    const [currentCount, setCurrentCount] = useState(0);
    const [text, setInfoText] = useState(''); 

    const handleTextChange = (e:any) => {
        const newText = e.target.value;
        setInfoText(newText);
        setCurrentCount(newText.length);     
    };
    return (
        <div className="AddHub">
            <div className="AddHubCenter">
                <div className='iconArea'>
                    <ul onClick={()=>{navigate('/DashBoard')}}><img style={{width:'132px', height:'80px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/></ul>
                </div>
                <div className='mainArea'>
                    <div className='titleArea'>
                        <span>데이터 허브 추가</span>
                    </div>
                    <div className='bodyArea'>
                        <div className='hubnameArea'>
                            <span>허브 이름</span>
                            <input type='text'></input>
                        </div>
                        <div className='hubInfoArea'>
                            <span>허브 설명</span>
                            <textarea  maxLength={totalCount} onChange={handleTextChange}> </textarea>
                            <span className='count'>{currentCount}/{totalCount}(글자수)</span>     
                        </div>
                    </div>
                    <div className='footerArea'>
                        <button>허브 추가</button>
                    </div>

                </div>
            </div>
      </div>
      
    );
};
export default AddHub;