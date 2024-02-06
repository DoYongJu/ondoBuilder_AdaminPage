import React, { useState, useRef, useEffect } from 'react';
import './SideBar.css';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiX } from "react-icons/bi";
interface SideBarProps {
    isOpen: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  let tmp ='국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 행정권은 대통령을 수반으로 하는 정부에 속한다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. ssss';

  const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
 
  const [changeProm, setChangeProm] = useState(false);
  const [longProm, setLongProm] = useState(tmp);
  const [shortProm, setShortProm] = useState('');
  
  useEffect(() => {
    const truncatedText = longProm.length > 300 ? longProm.slice(0, 300) + '...' : longProm;
    setShortProm(truncatedText);  
            
  }, [tmp]);
  function openProm(){
    setChangeProm(!changeProm)
  }
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
     
      <div className='nav'>
        <ul>
          <span>파일정보</span>
        </ul>
        <ul>
          <span><BiDotsHorizontalRounded  size={20}/></span>
        </ul>
        <ul>
          <span onClick={onClose} ><BiX size={20}  /></span>
        </ul>
      </div>
      <div className='title'>
          <span>조인트리 디오스 냉장고 2018 모델 수리방법 종합 정리본</span>
      </div>
      <div className='docsImgArea'>
        {/* {보승씨가 주는 아이콘 삽입 자리} */}
      </div>
      <div className='shortInfo'>
        <div className='key'>
          <ul>업로더</ul>
          <ul>파일용량</ul>
          <ul>업로드일</ul>
          <ul>최근 수정일</ul>
        </div>
        <div className='value'>
          <ul>조인트리</ul>
          <ul>120MB</ul>
          <ul>2024.01.31</ul>
          <ul>2024.01.31</ul> 
        </div>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> 대통령은 제3항과 제4항의 사유를 지체없이 공포하여야 한다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지이다</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 프롬프트</ul>
        <span> {changeProm?(shortProm):(longProm)}
        </span>
        <button onClick={openProm}> {changeProm?('프롬프트 열기'):('프롬프트  접기')} <img src={process.env.PUBLIC_URL + '/promtBtn.svg'} alt="버튼svg."/></button>
      </div>
   
    </div>
  );
};

export default SideBar;