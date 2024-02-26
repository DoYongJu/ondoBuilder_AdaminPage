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

const NavBar = () => {
  const navigate = useNavigate();
  const username = useRecoilValue(usernameState);
  const setusername = useSetRecoilState(usernameState);
  const setToken = useSetRecoilState(tokenState);

  const [selectList] = useState([
    { id: -1, name: `${username}님` },
    { id: -2, name: '로그아웃' },
]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
 
  useEffect(() => {
    const cookieUsername = Cookies.get('username');
    setusername(prevUsername => cookieUsername || prevUsername);
  }, [username]);


  const handleSelect = () => {
     Cookies.remove('accessToken');
      Cookies.remove('username');
      setusername('');
      setToken('');
      navigate('/Login');
  };

  function onClickQuest(){
    console.log('onClickQuest');
  };

  function onClickSetting(){
    console.log('onClickSetting');
  };
  function goToDashBoard(){
    navigate('/DashBoard');
  };

  return (
      <nav className='topGNB'>
        <ul className="logo" onClick={goToDashBoard}><img style={{width:'85px', height:'46px'}} src={process.env.PUBLIC_URL + '/ondoIcon.png'} alt="온도 로고"/></ul>
        <ul className='topMenu'>
          <div className='custom-select-box'>
            <div className="select-header" onClick={handleToggle}>
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
        
          {/* <li>
           <select onChange={handleSelect} value={Selected}>
           <option value='choice' disabled selected hidden>{username} 님</option>
            {selectList.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
            ))}
          </select> 
          </li> */}
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
