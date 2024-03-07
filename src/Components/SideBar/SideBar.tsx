import React, { useState, useRef, useEffect } from 'react';
import './SideBar.css';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import ConnectApi from '../../Module/ConnectApi';
import { useRecoilValue, useRecoilState} from 'recoil';
import { hubClassfiyState, fileNoSideBarState } from '../../Resources/Recoil';
interface SideBarProps {
    isOpen: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  let tmp ='국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 행정권은 대통령을 수반으로 하는 정부에 속한다. 비상계엄하의 군사재판은 군인·군무원의 범죄나 군사에 관한 간첩죄의 경우와 초병·초소·유독음식물공급·포로에 관한 죄중 법률이 정한 경우에 한하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여다음과 같은 판결을 내린 사례가 다수 존재 하여 이를 참고하기 바라므로국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. ssss';

  const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const type = useRecoilValue(hubClassfiyState); //상단탭 눌렀을때 분류 타입
  const [imageSrc, setImageSrc] = useState('');

  const [changeProm, setChangeProm] = useState(false);
  const [selctedClick, setSelctedClick] = useState(false);
  const [longProm, setLongProm] = useState(tmp);
  const [shortProm, setShortProm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const selectList=[',','다운로드','수정','삭제'],
  [fimeNoAndhubId] = useRecoilState (fileNoSideBarState);

  useEffect(() => { //파일을 하나 눌렀을때 해당 관련 정보를 가져오는 api=>02.26개발중, 태호씨 api 나오면 연결
    function selectInfoByOneFileApi() {
      ConnectApi({ method: 'GET', url: `/v1/api/datahub/`})
          .then((res) => {
            const truncatedText = longProm.length > 300 ? longProm.slice(0, 300) + '...' : longProm;
            setShortProm(truncatedText);  
          })
          .catch((error) => {
              console.error('Error occurred:', error);
          });
    };
    function chooseImgByType(){
      switch(type){
        case 'doc':
          setImageSrc('/doc.svg');
          break;
      case 'img':
          setImageSrc('/img.svg');
          break;
      case 'video':
          setImageSrc('/video.svg');
          break;
      case 'url':
          setImageSrc('/link.svg');
          break;
      default:
          setImageSrc(''); 
          break;
      }
    };

  selectInfoByOneFileApi();
  chooseImgByType();      
  }, []);

  function openProm(){
    setChangeProm(!changeProm)
  };

  function delFile(){
  
    switch(type){
      case 'doc':
        reqDel(type,'doc_no');
        break;
      case 'img':
        reqDel(type,'image_no');
        break;
      case 'video':
        reqDel(type,'video_no');
        break;
      case 'url':
        reqDel('urlDelete','url_no');
        break;
      default:
        break;
    };

   
  };
  function reqDel(type:string, fileName:string){
    let sendParam={}
      if(type !== 'img'){
        sendParam={
          hub_id: fimeNoAndhubId.hub_id,
          [fileName]:  fimeNoAndhubId.file_no,
        };
      }else{
        sendParam={
          hub_id: fimeNoAndhubId.hub_id,
          carousel_id: -100,//api필요.
          [fileName]:  fimeNoAndhubId.file_no,
      }
    };//end if

      ConnectApi({ method: 'DELETE', url: `/v1/api/datahub/${type}`,sendParam:sendParam })
      .then((res) => {
        console.log("*******")
        console.log(res.data)
      })
      .catch((error) => {
          console.error('Error occurred at SideBar/delFile:', error);
      });
  };

  function handleClickeditOrDel(option:string){
    setSelectedOption(option)
    if(option === '삭제'){
      delFile();
    }else{
      //수정 요청 함수 호출예정.
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
     
      <div className='nav'>
        <ul>
          <span>파일정보</span>
        </ul>
        <ul>
          <span onClick={()=>{setSelctedClick(!selctedClick);}}><BiDotsHorizontalRounded  size={20}/>
          {selctedClick &&
              <ul className="options-list">
              {selectList.slice(1).map((option, index) => (
                <li key={index} onClick={() => { handleClickeditOrDel(option);}} value={option}>
                  {option}
                </li>
              ))}
            </ul>
          }
          </span>
        </ul>
        <ul>
          <span onClick={onClose} ><BiX size={20}  /></span>
        </ul>
      </div>
      <div className='title'>
          <span>조인트리 디오스 냉장고 2018 모델 수리방법 종합 정리본</span>
      </div>
      <div className='docsImgArea'>
          <img style={{width:'212px', height:'164px' }} src={process.env.PUBLIC_URL +imageSrc}/>
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
        <span> {changeProm?(longProm):(shortProm)}
        </span>
        <button onClick={openProm}> 
        {!changeProm ? '프롬프트 열기' : '프롬프트 접기'}
        {changeProm && <img src={process.env.PUBLIC_URL + '/promtBtn.svg'} alt="버튼svg." />}
        {!changeProm && <img src={process.env.PUBLIC_URL + '/promtBtnDown.svg'} alt="버튼svg." />}
        </button>
      </div>
   
    </div>
  );
};

export default SideBar;