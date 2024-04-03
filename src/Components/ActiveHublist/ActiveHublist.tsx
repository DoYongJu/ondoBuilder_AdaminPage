import { useState, useEffect, useRef, DragEvent } from 'react';
import ConnectApi from '../../Module/ConnectApi';
import { useNavigate } from 'react-router-dom';
import { FiList } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil';
import { hubClassfiyState, MyObjectsState, ActiveHubFileListDetailsState} from '../../Resources/Recoil';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar'
import SelectBox from '../SelectBox/SelectBox';
import UploadFile from '../File/UploadFile/UploadFile';
import ClassfiydataOnType from '../../Module/ClassfiydataOnType';

import { ToastContainer, toast } from 'react-toastify';
import { LuListFilter } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import './ActiveHublist.css';

interface ClassifyType {
  id: number,
  name: string;
};

function ActiveHublist(){

  var Buffer = require('buffer/').Buffer;
  const type = useRecoilValue(hubClassfiyState), //상단탭 눌렀을때 분류 타입
    navigate = useNavigate(),
    [isFirst, setIsFirst] = useState(true), //허브에 데이터가 없을 때
    [viewWays, setViewWays] = useState(true), //false가 card방식으로 보기 눌렀을 때
    [searchType, setSearchType] = useState(''), //왼쪽상단 select에따른 정렬
    [, setSearchText] = useState(''),
    [selectedFilters, setSelectedFilters] = useState<string[]>([]),
    [activeButton, setActiveButton] = useState(type),
    [selectList, setSelectList] = useState<ClassifyType[]>([
      { id: -1, name: '조회' },
      { id: -2, name: '이름순' },
      { id: -3, name: '수정일순' },
      { id: -4, name: '업로드순' },  
    ]),

    [theHubInfo] = useRecoilState (MyObjectsState),

    filterList = ['선택','PDF','DOC','PPT','CSV'],
    [isSideBarOpen, setIsSideBarOpen] = useState(false),
    [isActive, setActive] = useState(false),
    [selctedClick, setSelctedClick] = useState(false),
    setHubClassify = useSetRecoilState(hubClassfiyState);
     
//File 업로드 관련
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openInputModal, setOpenInputModal] = useState<boolean | null>(null);

//랜더링
  const relanderingActiveHubFileList = useRecoilValue(ActiveHubFileListDetailsState);
console.log(type);
//데이터 허브의 파일 유무 체크
  useEffect(() => {
      function selectDataByTypeApi() {
        if(theHubInfo.hub_id !== -1){ //default가 -1, 허브를 클릭했을때만 api호출
          ConnectApi({ method: 'GET', url: `/v1/api/datahub/${theHubInfo.hub_id}?type=${type}`})
          .then((res) => {
            if (res.data.length !== 0) {
              setIsFirst(false);
            } else {
              setIsFirst(true);
            };
          })
          .catch((error) => {
            console.error('Error occurred at ActiveHublist/selectDataByTypeApi:', error);
          });
        };
      };
  
      selectDataByTypeApi();
  
  }, [isFirst, type, selectedFile, openInputModal, isSideBarOpen]);


  const buttons = [  //상단 탭 정보
        { label: '정보', value: 'info' },
        { label: '문서', value: 'doc' },
        { label: '이미지', value: 'img' },
        { label: '동영상', value: 'video' },
        { label: '링크', value: 'url' },
  ];


  function handleSelect (selectedValue:ClassifyType){ //상단 select박스 클릭 이벤트
        setSearchText('');
        setSearchType(selectedValue.name);
  };


  const handleButtonClick = (value:string) => { //상단 탭 클릭 페이지 이동 이벤트 
      setHubClassify(value);
      setActiveButton(value);
        switch(value){
          case "doc" :   navigate('/activeHublist',{state:theHubInfo}); break;
          case "img" :  navigate('/activeHublist',{state:theHubInfo}); break;
          case "video" :  navigate('/activeHublist',{state: theHubInfo}); break;
          case "url" :  navigate('/activeHublist',{state:theHubInfo}); break;
          case "info" :  navigate('/updateDataHub',{state:theHubInfo}); break;
          default : ;
        
        };
  };

//이미지 드롭
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    validateFile(file);
    setActive(false);
  };

//파일업로드버튼 클릭 이벤트
  const handleFileuploadButtonClick =()=>{
    if (fileInputRef.current) {
        fileInputRef.current.click();
      }
  };

//img 파일 타입 검사: image/jpeg', 'image/png', 'image/jpg' 허용.
  function isImageFileType(fileType:string) {
    let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(fileType)) {
        return false;
      };

    return true;
  };

//video 파일 타입 검사:'video/mp4', 'video/avi', 'video/wmv', 'video/mov' 허용.
  function isVideoFileType(fileType:string) {
    let allowedTypes = ['video/mp4', 'video/avi', 'video/wmv', 'video/mov'];
      if (!allowedTypes.includes(fileType)) {
        return false;
      };

    return true;
  };

//doc 파일 타입 검사: 하기의 내용 확인.
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
      return false;
    };

  return true;
  };

//file type에 따른 size 검사.
  const validateFile = (file:File)=>{
      const Filedata : File = new File([file], Buffer.from(file.name, 'ascii').toString('utf8'), { type: file.type }); 
      let fileType = file.type;
      let fileSize = file.size;
      setSelectedFile(Filedata);

      //파일 validation
      switch (type) { 
        case 'img':
          if (isImageFileType(fileType) === true && fileSize <= 5 * 1024 * 1024) {
              setSelectedFile(file);
          }else if(isImageFileType(fileType) === false && fileSize > 5 * 1024 * 1024){
            alertNotify("최대 5MB크기의 JPEG, PNG, JPG 파일만 업로드할 수 있습니다.");
          }else if(isImageFileType(fileType) === false && fileSize <= 5 * 1024 * 1024){
            alertNotify("JPEG, PNG, JPG 파일만 업로드할 수 있습니다.");
          }else{
            alertNotify('이미지 파일의 크기는 최대 5MB를 초과할 수 없습니다.');
          };
          break;

      case "doc":
          if (isDocFileType(fileType) === true && fileSize <= 5 * 1024 * 1024) {
              setSelectedFile(file);
          }else if(isDocFileType(fileType) === false && fileSize > 5 * 1024 * 1024){
            alertNotify("최대 5MB크기의 PPT, PPTX, CSV, XLS, XLSX, PDF, DOC, DOCS 파일만 업로드할 수 있습니다.");
          }else if(isDocFileType(fileType) === false && fileSize <= 5 * 1024 * 1024){
            alertNotify("PPT, PPTX, CSV, XLS, XLSX, PDF, DOC, DOCS 파일만 업로드할 수 있습니다.");
          }else{
            alertNotify('문서 파일의 크기는 최대 5MB를 초과할 수 없습니다.');
          };
          break;

      case "video":
          if (isVideoFileType(fileType) && fileSize <= 100 * 1024 * 1024) {
              setSelectedFile(file);
          }else if(isVideoFileType(fileType) === false && fileSize >  100 * 1024 * 1024){
            alertNotify("최대 100MB크기의 MP4, AVI, WMV, MOV 파일만 업로드할 수 있습니다.");
          }else if(isVideoFileType(fileType) === false && fileSize <=  100 * 1024 * 1024){
            alertNotify("MP4, AVI, WMV, MOV  파일만 업로드할 수 있습니다.");
          }else{
            alertNotify('비디오 파일의 크기는 최대 100MB를 초과할 수 없습니다.');
          };
          break;
      default:
          break;
      };
  };
//선택된 파일을 사이즈 검사를 시키며 value초기화
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    validateFile(file);
    e.target.value = '';  
  };
//alert toast
  const alertNotify = (errorMsg:string) => toast.error(errorMsg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  });
//suceess toast
  const successNotify = (errorMsg:string) => toast.success(errorMsg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
  });
// 클릭된 옵션을 toggle하는 함수
const toggleFilter = (option:string) => {
  if (selectedFilters.includes(option)) {
    // 이미 선택된 옵션이면 제외
    setSelectedFilters(selectedFilters.filter(item => item !== option));
  } else {
    // 선택되지 않은 옵션이면 추가
    setSelectedFilters([...selectedFilters, option]);
  }
};
//사용자가 요청한것을 성공했을때
function closeCompForSuccess(){
  setIsSideBarOpen(false);
  setSelectedFile(null);
  setOpenInputModal(false);
  successNotify('성공적으로 업로드 되었습니다.')
};
    return (

      <div className={`activeHublist ${isSideBarOpen ? 'sidebarOpen' : ''}`}>
             
              
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
            
        <div className="title"><span>{theHubInfo.hub_name}</span></div>
        <div className="sub_title">
          <div className='text' ><span>{theHubInfo.hub_description}</span></div> 
          <div className='btnArea'>
              <button className={`leftbtn ${viewWays ? 'active' : ''}`} onClick={()=>{setViewWays(true)}}><FiGrid size={24} /></button>
              <button className={`rightbtn ${viewWays ? '' : 'active'}`} onClick={()=>{setViewWays(false)}}><FiList size={25}/></button>
          </div>
        </div>
        <div className='dataHubBtnArea'>
            <ul>
            {buttons.map((button, index) => (
                <li key={index}>
                <button className={activeButton === button.value ? 'active' : `${type}`}
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
                {type === 'doc' && 
                <button onClick={()=>{setSelctedClick(!selctedClick)}} className='filter' value='필터'>
                <LuListFilter size={20}/>필터
              </button>
                }
                {selctedClick &&
                    <ul className="options-list">
                    {filterList.slice(1).map((option, index) => ( 
                        <li key={index}  value={option}>
                        {option}
                        <input type="checkbox"  className="Checkbox" value={option} onClick={() => { toggleFilter(option);}}></input>
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

              {isFirst && (
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
            <ClassfiydataOnType classfiyType={`${type}`} hubId={`${theHubInfo.hub_id}`} viewType={`${viewWays}`} 
            selected={searchType} filterDocType={selectedFilters} IsRelandering={relanderingActiveHubFileList}
            onClick={()=>{setIsSideBarOpen(!isSideBarOpen);}}/>
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
              <ClassfiydataOnType classfiyType={`${type}`} hubId={`${theHubInfo.hub_id}`} viewType={`${viewWays}`} selected={searchType} IsRelandering={relanderingActiveHubFileList}
              onClick={()=>{ setIsSideBarOpen(!isSideBarOpen); }} filterDocType={selectedFilters}/>
            )}
          </div>
        )}
        {/* 사이드바 나올때 다른 버튼들 못 건드리게 임시로 막음. */}
        {isSideBarOpen &&
         <div className="overlay" > 
        <SideBar isOpen={isSideBarOpen} onClose={closeCompForSuccess} /> 
        </div>  
        }
        

        {/* 파일은 링크 업로드 띄우는 코드 */}
        {(selectedFile)&& (  
          <div className="overlay"> 
            <UploadFile onClose={()=>{closeCompForSuccess()}} oneFile={selectedFile} fileType={type} /> 
          </div>  
        )}
        {/* 파일이 아닌 링크 업로드 띄우는 코드 */}
        {(openInputModal)&& (  
          <div className="overlay"> 
            <UploadFile onClose={()=>{closeCompForSuccess()}}  fileType={'url'} /> 
          </div>  
        )}
        
      
    </div>
    
    );
};
export default ActiveHublist;