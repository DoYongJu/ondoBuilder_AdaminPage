import { useState, useEffect, useRef, DragEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiList } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState} from 'recoil';
import { hubClassfiyState } from '../../Resources/Recoil';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar'
import SelectBox from '../SelectBox/SelectBox';
import UploadFile from '../UploadFile/UploadFile';
import {MyObject} from '../../Resources/Models';
import ClassfiydataOnType from '../../Module/ClassfiydataOnType';
import { LuListFilter } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import './ActiveHublist.css';


function ActiveHublist(){
    const type = useRecoilValue(hubClassfiyState); //상단탭 눌렀을때 분류 타입
    const location = useLocation();
    const navigate = useNavigate();
    const [isFirst, setIsFirst] = useState(true); //허브에 데이터가 없을 때
    const [viewWays, setViewWays] = useState(true); //true가 card방식으로 보기 눌렀을 때
    const [, setSelected] = useState('');
    const [, setSearchType] = useState('');
    const [, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const data:MyObject= location.state; //허브 정보
    const [activeButton, setActiveButton] = useState(type);
    const [selectList, setSelectList] = useState([
      { id: -1, name: '조회' },
      { id: -2, name: '이름순 않음' },
      { id: -3, name: '수정일 순' },
      { id: -4, name: '업로드 순' },  
  
  ]);
    const filterList = ['선택','PDF','DOC','PPT','CSV'];

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isActive, setActive] = useState(false);
  
    const [uploadedInfo, setUploadedInfo] = useState(false);
    const [selctedClick, setSelctedClick] = useState(false);


    
    const setHubClassify = useSetRecoilState(hubClassfiyState);
    const buttons = [ //상단 탭 정보
        { label: '정보', value: 'info' },
        { label: '문서', value: 'doc' },
        { label: '이미지', value: 'img' },
        { label: '동영상', value: 'video' },
        { label: '링크', value: 'url' },
    ];

    function handleSelect (selectedValue:any){
        setSearchText('');
        setSelected(selectedValue);
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
    
    //File 업로드 관련
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openInputModal, setOpenInputModal] = useState<boolean | null>(null);

  
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    // const items = e.dataTransfer.items;
    const file = e.dataTransfer.files[0];
    validateFile(file);
    setActive(false);

    // if (items) {
    //   for (let i = 0; i < items.length; i++) {
    //     const item = items[i];
    //     if (item.kind === 'file') {
    //       const tempFile = item.getAsFile();
    //       handleFileChange(tempFile);
    //       setActive(false);

    //       // if (tempFile) {
    //       //   setSelectedFile(tempFile);
    //       //   setUploadedInfo(true);
    //       //   setActive(false);
    //       //   setIsFirst(false); //나중에 파일 업로드 된 후 사용될 코드. 개발 테스트로 인해 현재 위치
           
    //       // };
    //     };
    //   };
    // };
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
    // 파일 타입 확인
    const fileType = file.type;
    // 파일 크기 확인
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
              <button className='leftbtn' onClick={()=>{setViewWays(!viewWays)}}><FiGrid size={24} /></button>
              <button className='rightbtn' onClick={()=>{setViewWays(!viewWays)}}><FiList size={25}/></button>
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
                  {/* <p className="preview_desc">파일당 최대 3MB</p> */}
                </>
              )}
            </label>
          </div>
        </div>
        )}

        {!isFirst && viewWays && (
          <div className='contbox'>
            <ClassfiydataOnType classfiyType={`${type}`} hubId={`${data.hub_id}`} viewType={`${viewWays}`} onClick={()=>{ setIsSideBarOpen(!isSideBarOpen);} }/>
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
              <ClassfiydataOnType classfiyType={`${type}`} hubId={`${data.hub_id}`} viewType={`${viewWays}`} onClick={()=>{ setIsSideBarOpen(!isSideBarOpen);} }/>
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