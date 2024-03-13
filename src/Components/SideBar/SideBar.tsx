import React, { useState, useEffect } from 'react';
import './SideBar.css';
import axios from "axios"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import {dataByType} from '../../Resources/Models';
import Cookies from 'js-cookie';
import { useRecoilValue, useRecoilState} from 'recoil';
import { hubClassfiyState, videoDetailsState, urlDetailsState, imgDetailsState,
  dataByImgState, docDetailsState} from '../../Resources/Recoil';
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
  token = Cookies.get('accessToken');

  const docInfo = useRecoilValue(docDetailsState);
  const urlInfo = useRecoilValue(urlDetailsState);
  const videoInfo = useRecoilValue(videoDetailsState);
  const imgInfo = useRecoilValue(imgDetailsState);

   useEffect(() => {
    function chooseImgByType() {
      console.log(imgInfo);
      console.log('fileType: '+type);
      
      switch(type) {
        case 'doc':
          setImageSrc('/doc.svg');
          break;
        case 'img':
          // console.log(extractPatterns(imgInfo.file_tag));
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
    
    chooseImgByType();   
  }, [docInfo, urlInfo, imgInfo, videoInfo]); 

  function extractPatterns(inputString: string): string {
    const patterns: string[] = [];
    let currentPattern: string = "";

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === '"' && inputString[i + 1] === "," && inputString[i + 2] === '"') {
            i += 2; // 이 경우 {" 패턴을 건너뜁니다.
        } else if (inputString[i] === '"') {
            currentPattern += inputString[i]; // 문자열의 시작 또는 끝인 경우 현재 패턴에 추가하지 않고 건너뜁니다.
        } else if (inputString[i] === "," && inputString[i + 1] === '"') {
            patterns.push(currentPattern); // 패턴이 완료되면 배열에 추가합니다.
            currentPattern = ""; // 현재 패턴을 초기화합니다.
            i += 1; // , 뒤에 따옴표가 오는 경우 건너뜁니다.
        } else {
            currentPattern += inputString[i]; // 문자열을 현재 패턴에 추가합니다.
        }
    }

    if (currentPattern !== "") {
        patterns.push(currentPattern); // 마지막 패턴을 배열에 추가합니다.
    }

    return patterns.join(",");
}

  function openProm(){
    setChangeProm(!changeProm)
  };

  function delFile(){
  
    switch(type){
      case 'doc':
        deleteDocFile();
        // reqDel(type,'doc_no');
        break;
      case 'img':
        deleteImgFile();
        break;
      case 'video':
        deleteVideoFile();
        break;
      case 'url':
        deleteUrlFile();
        break;
      default:
        break;
    };

   
  };
  function deleteImgFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/${type}`,
      data: {
        hub_id: imgInfo.hub_id,
        url_no: imgInfo.image_no,
        "carousel_id": 0, // 데이터 없음. 태호씨가 res에 추가하면 수정예정 

      }
    }).then(function (res){
      console.log(res.data);
    });
  };
  function deleteUrlFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/urlDelete`,
      data: {
        carousel_id: urlInfo.hub_id,
        image_no:  urlInfo.url_no
      }
    }).then(function (res){
      console.log(res.data);
    });
  };
  function deleteVideoFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/${type}`,
      data: {
        hub_id: videoInfo.hub_id,
        video_no:  videoInfo.video_no
      }
    }).then(function (res){
      console.log(res.data);
    });
  };
  function deleteDocFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/${type}`,
      data: {
        hub_id: docInfo.hub_id,
        doc_no:  docInfo.doc_no
      }
    }).then(function (res){
      console.log(res.data);
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


     {type === 'doc' && //doc일때의 사이드바
     <>
      <div className='title'>
          <span>{docInfo.file_name}</span>
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
          <ul>{docInfo.writer}</ul>
          <ul>{docInfo.file_size}</ul>
          <ul>{docInfo.file_regdate}</ul>
          <ul>{docInfo.file_upddate}</ul>  
        </div>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> {docInfo.file_description}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 프롬프트</ul> 
        <div className='promtArea'> {changeProm? docInfo.file_prompt.slice(0, 300)+'...' :  docInfo.file_prompt}</div>
        <button onClick={openProm}> 
          {changeProm ? '프롬프트 열기' : '프롬프트 접기'}
          {!changeProm && <img src={process.env.PUBLIC_URL + '/promtBtn.svg'} alt="버튼svg." />}
          {changeProm && <img src={process.env.PUBLIC_URL + '/promtBtnDown.svg'} alt="버튼svg." />}
        </button>
      </div>
     </>}

     {type === 'img' &&
     <>
      <div className='title'>
          <span>{imgInfo.file_name}</span>
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
          <ul>카로셀 그룹</ul>
          <ul>카로셀 순번</ul>
        </div>
        <div className='value'>
          <ul>{imgInfo.writer}</ul>
          <ul>{imgInfo.file_size}</ul>
          <ul>{imgInfo.file_regdate}</ul>
          <ul>{imgInfo.file_upddate}</ul>
          <ul>카로셀 그룹 추후 데이터 포함 예정 {imgInfo.casosel_name} </ul>
          <ul>카로셀 순번에 대한 정보는 api에 없음. 추후 데이터 포함 예정 </ul>    
        </div>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> {imgInfo.file_description}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 태그</ul> 
        <div className='promtArea'>{imgInfo.file_tag.replace(/[\\"{}]/g, " ")}</div>
      </div>
     </>}    


     {type === 'video' &&
     <>
      <div className='title'>
          <span>{videoInfo.file_name}</span>
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
          <ul>{videoInfo.writer}</ul>
          <ul>{videoInfo.file_size}</ul>
          <ul>{videoInfo.file_regdate}</ul>
          <ul>{videoInfo.file_upddate}</ul>  
        </div>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> {videoInfo.file_description}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 태그</ul> 
        <div className='promtArea'> {videoInfo.file_tag?.replace(/[\\"{}]/g, " ")}</div>
      </div>
     </>} 


    {type === 'url' &&
     <>
      <div className='title'>
          <span>{urlInfo.url_description}</span>
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
          <ul>{urlInfo.writer}</ul>
          <ul>--</ul>
          <ul>{urlInfo.url_regdate}</ul>
          <ul>{urlInfo.url_upddate}</ul>  
        </div>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> {urlInfo.url_description}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 태그</ul> 
        <div className='promtArea'> 데이터없음. url의 태그가 넘어온다면 들어오게 될 자리.{urlInfo.url_tags}</div>
      </div>
     </>}    
    </div>
       
  );
        
};

export default SideBar;