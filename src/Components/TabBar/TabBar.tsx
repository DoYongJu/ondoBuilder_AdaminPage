import React, { useState,useEffect} from 'react';
import './TabBar.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface TabState {
    id: number;
    active: boolean;
    title:string;
    path: string;
  }

const TabBar=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [tabs, setTabs] = useState<TabState[]>([
        { id: 1, active: true, title:'사용자 정보' , path: '/mypage'},
        { id: 2, active: false, title:'히스토리' ,path: '/history'},
        { id: 3, active: false, title:'사용자 관리' ,path: '/mypage'}, //추후 페이지 생성 후 추가예정
      ]);

    useEffect(() => {
        const updatedTabs = tabs.map(tab => ({
            ...tab,
            active: tab.path === location.pathname
        }));
        setTabs(updatedTabs);
    }, [location.pathname]);

    const handleTabClick = (clickedTab: TabState) => {
        navigate(clickedTab.path);
    };
    
    return(
        <div className='tabBarComponent'>
            <ul>
            {tabs.map(tab => (
                <li key={tab.id} className={tab.active ? 'active' : ''} onClick={() => handleTabClick(tab)}>
                    {tab.title}
                </li>
            ))}
            </ul>
        </div>
    );

};
export default TabBar;