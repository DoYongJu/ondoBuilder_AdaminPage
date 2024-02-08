import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usernameState, tokenState } from './Resources/Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Login from './Components/User/Login/Login';
import DashBoard from './Components/DashBoard/DashBoard';
import NavBar from './Components/NavBar/NavBar';
import SignUp from './Components/User/SignUp/SignUp';
import ChangePwd from './Components/User/ChangePwd/ChangePwd';
import SignAccept from './Components/User/SignAccept/SignAccept';
import CreateDataHub from './Components/DataHub/CreateDataHub/CreateDataHub';
import UpdateDataHub from './Components/DataHub/UpdateDataHub/UpdateDataHub';
import InfoDataHub from './Components/DataHub/InfoDataHub/InfoDataHub';
import ActiveHublist from './Components/ActiveHublist/ActiveHublist';
import AddHub from './Components/AddHub/AddHub';
import Cookies from 'js-cookie';


const Router = () => {
 
  const setUserName = useSetRecoilState(usernameState);
  const username = useRecoilValue(usernameState);
  const token= Cookies.get('accessToken');
  // useEffect(() => {
  //   const storedUsername = Cookies.get('username');
  //   if (storedUsername) {
  //     setUserName(storedUsername);
  //   }
  // }, [setUserName]);
  
  return (
    <BrowserRouter>
     {token && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ChangePwd" element={<ChangePwd />} />
        <Route path="/SignAccept" element={<SignAccept />} />
        <Route path="/CreateDataHub" element={<CreateDataHub />} />
        <Route path="/InfoDataHub" element={<InfoDataHub />} />
        <Route path="/UpdateDataHub" element={<UpdateDataHub />} />
        <Route path="/ActiveHublist" element={<ActiveHublist />} />
        <Route path="/AddHub" element={<AddHub />} />
      
        
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
