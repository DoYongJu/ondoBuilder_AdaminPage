import { useState, useEffect, useRef, DragEvent } from 'react';
import ConnectApi from '../../Module/ConnectApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiList } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { hubClassfiyState } from '../../Resources/Recoil';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar'
import SelectBox from '../SelectBox/SelectBox';
import UploadFile from '../UploadFile/UploadFile';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClassfiydataOnType from '../../Module/ClassfiydataOnType';

import { LuListFilter } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import './ActiveHublist.css';


function ActiveHublist(){
    const type = useRecoilValue(hubClassfiyState), //상단탭 눌렀을때 분류 타입
      location = useLocation(),
      navigate = useNavigate(),
      [isFirst, setIsFirst] = useState(true), //허브에 데이터가 없을 때
      [viewWays, setViewWays] = useState(true), //false가 card방식으로 보기 눌렀을 때
      [searchType, setSearchType] = useState(''), //왼쪽상단 select에따른 정렬
      [, setSearchText] = useState(''),
      [selectedOption, setSelectedOption] = useState(''),
      [data, setData] = useState(location.state),//허브 정보 
      [activeButton, setActiveButton] = useState(type),
      [selectList, setSelectList] = useState([
      { id: -1, name: '조회' },
      { id: -2, name: '이름순' },
      { id: -3, name: '수정일순' },
      { id: -4, name: '업로드순' },  
      ]),

      filterList = ['선택','PDF','DOC','PPT','CSV'],
      [isSideBarOpen, setIsSideBarOpen] = useState(false),
      [isActive, setActive] = useState(false),
      [uploadedInfo, setUploadedInfo] = useState(false),
      [selctedClick, setSelctedClick] = useState(false),
      setHubClassify = useSetRecoilState(hubClassfiyState);
  
    //File 업로드 관련
    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openInputModal, setOpenInputModal] = useState<boolean | null>(null);

  useEffect(() => {
      //데이터 허브의 종속된 파일을 타입별로 조회 null값 체크
      function selectDataByTypeApi() {
        console.log('hub_id: '+data.hub_id);
        ConnectApi({ method: 'GET', url: `/v1/api/datahub/${data.hub_id}?type=${type}`})
            .then((res) => {
              if (res.data.length !== 0) {
                setIsFirst(false);
              } else {
                setIsFirst(true);
              };
            })
            .catch((error) => {
              console.error('Error occurred:', error);
            });
      };
  
      selectDataByTypeApi();
  
  }, [isFirst, viewWays, type]);
    

    const buttons = [ //상단 탭 정보
        { label: '정보', value: 'info' },
        { label: '문서', value: 'doc' },
        { label: '이미지', value: 'img' },
        { label: '동영상', value: 'video' },
        { label: '링크', value: 'url' },
    ];

    function handleSelect (selectedValue:any){
        setSearchText('');
        setSearchType(selectedValue);
    };

    const handleButtonClick = (value:string) => {
      setHubClassify(value);
      setActiveButton(value);
        switch(value){
          case "doc" :   navigate('/ActiveHublist',{state:data}); break;
          case "img" :  navigate('/ActiveHublist',{state:data}); break;
          case "video" :  navigate('/ActiveHublist',{state: data}); break;
          case "url" :  navigate('/ActiveHublist',{state:data}); break;
          case "info" :  navigate('/updateDataHub',{state:data}); break;
          default : ;
        
        };
    };
  
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateFile(file);
    setActive(false);
  };

  const handleFileuploadButtonClick =()=>{
    if (fileInputRef.current) {
        fileInputRef.current.click();
      }
  };

  function isImageFileType(fileType:string) {
    let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(fileType)) {
        alert("올바른 이미지 파일 형식이 아닙니다. JPEG, PNG, JPG 파일만 업로드할 수 있습니다.");
        return false;
      };

    return true;
  };

  function isVideoFileType(fileType:string) {
    let allowedTypes = ['video/mp4', 'video/avi', 'video/wmv', 'video/mov'];
      if (!allowedTypes.includes(fileType)) {
        alert("올바른 비디오 파일 형식이 아닙니다. mp4, avi, wmv, mov 파일만 업로드할 수 있습니다.");
        return false;
      };

    return true;
  };

  function isDocFileType(fileType:string){
    let allowedTypes = [
      'application/vnd.ms-powerpoint', // ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
      'text/csv', // csv
      'application/vnd.ms-excel', // xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/pdf', // pdf
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docs
    ];
    if (!allowedTypes.includes(fileType)) {
      alert("올바른 문서 파일 형식이 아닙니다. ppt, pptx, csv, xls, xlsx, pdf, doc, docs 파일만 업로드할 수 있습니다.");
      return false;
    };

  return true;
  };

  const validateFile = (file:File)=>{
      const fileType = file.type;
      const fileSize = file.size;
      //파일 validation
      switch (type) { 
        case 'img':
          if (isImageFileType(fileType) && fileSize <= 5 * 1024 * 1024) {
              setSelectedFile(file);
          } else {
              alert('이미지 파일의 크기는 최대 5MB를 초과할 수 없습니다.');
          }
          break;
      case "doc":
          if (isDocFileType(fileType) && fileSize <= 5 * 1024 * 1024) {
              setSelectedFile(file);
          } else {
              alert('문서 파일의 크기는 최대 5MB를 초과할 수 없습니다.');
          }
          break;
      case "video":
          if (isVideoFileType(fileType) && fileSize <= 100 * 1024 * 1024) {
              setSelectedFile(file);
          } else {
              alert('비디오 파일의 크기는 최대 100MB를 초과할 수 없습니다.');
          }
          break;
      default:
          break;
      };
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    validateFile(file);
    e.target.value = '';  
  };

    return (

      <div className={`activeHublist ${isSideBarOpen ? 'sidebarOpen' : ''}`}>

        <div className="title"><span>{data.hub_name}</span></div>
        <div className="sub_title">
          <div className='text' ><span>{data.hub_description}</span></div> 
          <div className='btnArea'>
              <button className={`leftbtn ${viewWays ? 'active' : ''}`} onClick={()=>{setViewWays(true)}}><FiGrid size={24} /></button>
              <button className={`rightbtn ${viewWays ? '' : 'active'}`} onClick={()=>{setViewWays(false)}}><FiList size={25}/></button>
          </div>
        </div>
        <div className='dataHubBtnArea'>
            <ul>
            {buttons.map((button, index) => (
                <li key={index}>
                <button className={activeButton === button.value ? 'active' : ''}
                    onClick={() => handleButtonClick(button.value)}
                    value={button.value} >
                    {button.label}
                </button>
                </li>
            ))}
            </ul>
           
        </div>
        <div className='selectAndSearch'>
            <div className='selectArea'>
                <div className='real'>
                    <SelectBox handleSelect ={handleSelect} selectList={selectList}/>
                </div>
                <SearchBar />
            </div>
            <div className='buttonArea'>
                <button onClick={()=>{setSelctedClick(!selctedClick)}} className='filter' value='필터'>
                    <LuListFilter size={20}/>필터
                </button>
                {selctedClick &&
                    <ul className="options-list">
                    {filterList.slice(1).map((option, index) => ( 
                        <li key={index} onClick={() => { setSelectedOption(option);}} value={option}>
                        {option}
                        <input type="checkbox"  className="Checkbox" value={option}></input>
                        </li>
                
                    ))}
                    </ul>
                    }
                    {type==='url' && 
                      <button className='fileupload' value='링크업로드' onClick={()=>setOpenInputModal(true)} >
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e)=>handleFileChange(e)}/>
                        <FiUpload /> 링크 업로드
                      </button>  
                    }
                    {type!=='url' && 
                      <button className='fileupload' value='파일업로드' onClick={handleFileuploadButtonClick}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e)=>handleFileChange(e)}/>
                        <FiUpload /> 파일 업로드
                      </button>  
                    }
              
            </div>
        </div>
        {/* 처음 진입 할때, 파일 드롭 화면 */}
        {isFirst && viewWays && (
        <div className='contbox'>
            <div className="ChatFileInfo">
            <label className={`preview${isActive ? ' active' : ''}`} 
              onDragEnter={handleDragStart}
              onDragLeave={handleDragEnd}
              onDrop={handleDrop}
              onDragOver={(e)=>{ e.preventDefault();}}> 
              <input type="file" className="chatFile" onChange={(e)=>handleFileChange(e)}/>

              {!uploadedInfo && (
                <>
                  <img style={{width:'85px', height:'85px'}} src={process.env.PUBLIC_URL + '/fileupload.svg'} alt="클라우드 대기 이미지"/>
                  <p className="preview_msg">
                  업로드할 파일을 이곳에 파일을 드래그 앤 드롭하세요
                  </p>
                </>
              )}
            </label>
          </div>
        </div>
        )}

        {!isFirst && viewWays && (
          <div className='contbox'>
            <ClassfiydataOnType classfiyType={`${type}`} hubId={`${data.hub_id}`} viewType={`${viewWays}`} selected={searchType} 
            onClick={()=>{ setIsSideBarOpen(!isSideBarOpen)}} selectedF={()=>{setSelectedFile(null)}}/>
          </div>
        )}
        { !viewWays && ( 
          <div className='waysOflist'>
            <div className='list'>
              <ul>
                <li>이름</li>
                <li>파일설명</li>
                <li>업로더</li>
                <li>업로드일</li>
                <li>최근 수정일</li>
                <li>용량</li>
              </ul>
            </div>

            {!isFirst && (
              <ClassfiydataOnType classfiyType={`${type}`} hubId={`${data.hub_id}`} viewType={`${viewWays}`} selected={searchType} 
              onClick={()=>{ setIsSideBarOpen(!isSideBarOpen);}} selectedF={()=>{setSelectedFile(null)}}/>
            )}
          </div>
        )}

        
        <SideBar isOpen={isSideBarOpen} onClose={()=>{ setIsSideBarOpen(false);}} /> 

        {/* 모달 띄우는 코드 */}
        {(selectedFile)&& (  
          <div className="overlay"> 
            <UploadFile onClose={()=>{setSelectedFile(null);}} oneFile={selectedFile} fileType={type}/> 
          </div>  
        )}
        {(openInputModal)&& (  
          <div className="overlay"> 
            <UploadFile onClose={()=>{setOpenInputModal(false);}}  fileType={'link'}/> 
          </div>  
        )}
        
      
    </div>
    
    );
};
export default ActiveHublist;