import React, { useState, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa";
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { usernameState, tokenState } from '../../Resources/Recoil';
import { SlQuestion } from "react-icons/sl";
import { SlSettings } from "react-icons/sl";
import { GoPerson } from "react-icons/go";
import SelectBox from '../SelectBox/SelectBox';
import Cookies from 'js-cookie';

const NavBar = ( {setUser}:any ) => {
  const navigate = useNavigate(),
    username = useRecoilValue(usernameState),
    setusername = useSetRecoilState(usernameState),
    setToken = useSetRecoilState(tokenState),
    [selectList] = useState([
    { id: -1, name: `${username}님` },
    { id: -2, name: '로그아웃' },
    ]),
    [isOpen, setIsOpen] = useState(false);
  
 
  useEffect(() => {
    const cookieUsername = Cookies.get('username');
    setusername(prevUsername => cookieUsername || prevUsername);
  }, [username]);


  const handleSelect = () => {
     Cookies.remove('accessToken');
      Cookies.remove('username');
      setusername('');
      setToken('');
      setUser('');
      navigate('/Login');

  };

  function onClickQuest(){
    console.log('onClickQuest');
  };

  function onClickSetting(){
    console.log('onClickSetting');
  };


  return (
      <nav className='topGNB'>
        <ul className="logo" onClick={()=>{ navigate('/DashBoard');}}><img style={{width:'85px', height:'46px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/></ul>
        <ul className='topMenu'>
          <div className='custom-select-box'>
            <div className="select-header" onClick={()=>{ setIsOpen(!isOpen);}}>
             {`${username}님`}
             {isOpen && (
              <ul className="options-list">
              {selectList.slice(1).map((option, index) => (
                <li key={index} onClick={handleSelect} value={option.name}>
                  {option.name}
                </li>
              ))}
              </ul>
            )} 
            <FaAngleDown />
            </div> 
          </div>
          <div className='navOption'>
            <li><button  onClick={onClickQuest}><SlQuestion size={25}/> </button></li>
            <li><button onClick={() => {navigate('/mypage'); }}><GoPerson size={25}/></button> </li>
            <li><button  onClick={onClickSetting}><SlSettings size={25}/></button> </li>
            <li><input type="button" value="+ 허브 추가" onClick={() => {navigate('/addHub'); }}/></li>
          </div>
        </ul>
      </nav>
  );
};

export default NavBar;
