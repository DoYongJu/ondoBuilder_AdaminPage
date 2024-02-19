import React, { useState } from 'react';
import './TabBar.css';
import { useNavigate } from 'react-router-dom';
interface TabState {
    id: number;
    active: boolean;
    title:string;
  }

const TabBar=()=>{
    const navigate = useNavigate();
    const [tabs, setTabs] = useState<TabState[]>([
        { id: 1, active: false, title:'사용자 정보' },
        { id: 2, active: false, title:'히스토리'},
        { id: 3, active: false, title:'사용자 관리' },
      ]);

    const handleTabClick = (clickedTabTitle: string) => {
       
      const updatedTabs = tabs.map(tab =>
        tab.title === clickedTabTitle ? { ...tab, active: true } : { ...tab, active: false }
      );

      setTabs(updatedTabs);
      switch(clickedTabTitle){
        case '사용자 정보': navigate('/mypage'); break;
        case '히스토리': navigate('/history'); break;
        case '사용자 관리': break;
        default: break; 
      };
    };
    
    return(
        <div className='tabBarComponent'>
            <ul>
            {tabs.map(tab => (
                <li key={tab.id} className={tab.active ? 'active' : ''} onClick={() => handleTabClick(tab.title)}>
                    {tab.title}
                </li>
            ))}
            </ul>
        </div>
    );

};
export default TabBar;