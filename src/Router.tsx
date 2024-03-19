import {useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { usernameState } from './Resources/Recoil';
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
import AdminUser from './Components/User/AdminUser/AdminUser';
import Cookies from 'js-cookie';


const Router = () => {
 
  const setUserName = useSetRecoilState(usernameState);
  const username = useRecoilValue(usernameState);
  let [user, setUser]:any = useState('')

  const userLoginAction = () => {
    const storedUsername = Cookies.get('username');
    user = Cookies.get('username');
    console.log("user"+user)
    if (storedUsername) {
      setUserName(storedUsername);
    }
  };
  // function userLoginAction_back(){
  //   const storedUsername = Cookies.get('username');
  //   user = Cookies.get('username');
  //   console.log("user:"+user)
  //   if (storedUsername) {
  //     setUserName(storedUsername);
  //   }
  // }
  useEffect(() => {
    // 매 렌더링마다 실행
    console.log("나 매 렌더링!")
    userLoginAction();
  });
  
  useEffect(() => {
    console.log("나 값 바뀔때만!")
    userLoginAction();
  }, [setUserName, user]);
  
  return (
    <BrowserRouter>
     {username  && <NavBar setUser={setUser}/>}
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route  path="/dashBoard" element={<DashBoard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/changePwd" element={<ChangePwd />} />
        <Route path="/signAccept" element={<SignAccept />} />
        <Route path="/infoDataHub" element={<InfoDataHub />} />
        <Route path="/updateDataHub" element={<UpdateDataHub />} />
        {/* <Route path="/hubId" element={< Navigate replace to='/updateDataHub' />} /> */}
        <Route path="/activeHublist" element={<ActiveHublist />} />
        <Route path="/addHub" element={<AddHub />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/history" element={<History />} />
        <Route path="/adminUser" element={<AdminUser />} />
        <Route path="/" element={< Navigate replace to='/Login' />} />
        
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
