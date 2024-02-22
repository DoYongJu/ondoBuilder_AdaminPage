import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './AddHub.css';
const AddHub=()=>{
    const navigate = useNavigate();
    const totalCount = 50;
    const [currentCount, setCurrentCount] = useState(0);
    const [title, setTitle] = useState(''); //허브 이름
    const [text, setInfoText] = useState('');  //허브 설명
    const token= Cookies.get('accessToken');

    const handleTextChange = (e:any) => {
        const newText = e.target.value;
        setInfoText(newText);
        setCurrentCount(newText.length);     
    };   

  async function AddHubApi() {
    const sendParam = {
        hub_name: title,
        hub_description: text,
    };

    await axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'/v1/api/datahub',
      headers: {"accept": 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      data: sendParam
      
    }).then(response => {
      // setusername(response.data.user_name);
      console.log(response.data);
      navigate('/DashBoard');
   
      
    }).catch(error =>{
      // if (error.response && error.response.status === 400 && error.response.data.message === "user_verify value Error"){
      //   navigate('/SignAccept');
      // };
      console.log('error:'+ error);
     
    });

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
                            <input type='text' onChange={(e)=>{setTitle(e.target.value)}}></input>
                        </div>
                        <div className='hubInfoArea'>
                            <span>허브 설명</span>
                            <textarea  maxLength={totalCount} onChange={handleTextChange} > </textarea>
                            <span className='count'>{currentCount-1}/{totalCount}(글자수)</span>     
                        </div>
                    </div>
                    <div className='footerArea'>
                        <button onClick={AddHubApi}>허브 추가</button>
                    </div>

                </div>
            </div>
      </div>
      
    );
};
export default AddHub;