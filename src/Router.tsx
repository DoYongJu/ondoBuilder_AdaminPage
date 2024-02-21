import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from 'react-router-dom';
import { usernameState, tokenState } from './Resources/Recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Login from './Components/User/Login/Login';
import DashBoard from './Components/DashBoard/DashBoard';
import NavBar from './Components/NavBar/NavBar';
import SignUp from './Components/User/SignUp/SignUp';
import ChangePwd from './Components/User/ChangePwd/ChangePwd';
import SignAccept from './Components/User/SignAccept/SignAccept';
import UpdateDataHub from './Components/DataHub/UpdateDataHub/UpdateDataHub';
import InfoDataHub from './Components/DataHub/InfoDataHub/InfoDataHub';
import ActiveHublist from './Components/ActiveHublist/ActiveHublist';
import AddHub from './Components/AddHub/AddHub';
import Mypage from './Components/User/Mypage/Mypage';
import History from './Components/User/History/History';
import Cookies from 'js-cookie';


const Router = () => {
 
  const setUserName = useSetRecoilState(usernameState);
  const username = useRecoilValue(usernameState);
  const token= Cookies.get('accessToken');
  
  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, [setUserName]);
  
  return (
    <BrowserRouter>
     {username && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/dashBoard" element={<DashBoard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/changePwd" element={<ChangePwd />} />
        <Route path="/signAccept" element={<SignAccept />} />
        <Route path="/infoDataHub" element={<InfoDataHub />} />
        <Route path="/updateDataHub" element={<UpdateDataHub />} />
        <Route path="/activeHublist" element={<ActiveHublist />} />
        <Route path="/addHub" element={<AddHub />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/history" element={<History />} />
      
        
      </Routes>
    </BrowserRouter>
  );
};

// const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
//   const username = useRecoilValue(usernameState);

//   return (
//     <Route
//       {...rest}
//       element={username ? element : <Navigate to="/login" replace />}
//     />
//   );
// };
export default Router;
