import { useState, useEffect, useRef, DragEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { UploadedInfo } from '../../Resources/Models';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../SearchBar/SearchBar'
import SelectBox from '../SelectBox/SelectBox';
import UploadFile from '../UploadFile/UploadFile';
import { LuListFilter } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import './ActiveHublist.css';


function ActiveHublist(){
    const location = useLocation();
    const navigate = useNavigate();
    const [isFirst, setIsFirst] = useState(true);
    const [, setSelected] = useState('');
    const [, setSearchType] = useState('');
    const [, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const [activeButton, setActiveButton] = useState('default');
    const selectList = ['조회','이름순','수정일 순','업로드 순'];
    const filterList = ['선택','PDF','DOC','PPT','CSV'];

    const type:string= location.state;
    
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isActive, setActive] = useState(false);
  
    const [uploadedInfo, setUploadedInfo] = useState(false);
    const [selctedClick, setSelctedClick] = useState(false);

    const handleCloseSideBar = () => {
      setIsSideBarOpen(false);
    };

    function handleCloseFileUpload(){
      setSelectedFile(null);
    };

    const buttons = [
        { label: '정보', value: 'info' },
        { label: '문서', value: 'doc' },
        { label: '이미지', value: 'img' },
        { label: '동영상', value: 'video' },
        { label: '링크', value: 'link' },
    ];

    function handleSelect (selectedValue:any){
        setSearchText('');
        setSelected(selectedValue);
        setSearchType(selectedValue);
    };

    const handleButtonClick = (value:string) => {
  
        switch(value){
          case "doc" :   navigate('/ActiveHublist',{state:"doc"}); break;
          case "img" :  navigate('/ActiveHublist',{state:"img"}); break;
          case "video" :  navigate('/ActiveHublist',{state: "video"}); break;
          case "link" :  navigate('/ActiveHublist',{state:"link"}); break;
          default :   navigate('/UpdateDataHub',{state:type});  //24.02.07 추후 체크 필요
        setActiveButton(value);
        };
    };
    
    //File 업로드 관련
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const items = e.dataTransfer.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const tempFile = item.getAsFile();
          if (tempFile) {
            setSelectedFile(tempFile);
            setUploadedInfo(true);
            setActive(false);
            setIsFirst(false); //나중에 파일 업로드 된 후 사용될 코드. 개발 테스트로 인해 현재 위치
           
          };
        };
      };
    };
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleFileuploadButtonClick =()=>{
    if (fileInputRef.current) {
        fileInputRef.current.click();
      }
  };

  const handleFileChange = (e:any) => {
   
    const selectedFile = e.target.files[0];
    console.log('Selected File:', selectedFile);
    if(selectedFile){
      setSelectedFile(selectedFile);
    }else{
      setSelectedFile(null);
    }
    
  };
    return (

      <div className={`activeHublist ${isSideBarOpen ? 'sidebarOpen' : ''}`}>

        <div className="title"><span>데이터 허브 이름</span></div>
        <div className="sub_title"><span>데이터허브 설명 공간 최대로 표시하는 글자수는 
            50자로 한정하여 해당 케이스는 최대일 경우</span></div>
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
                <button className='fileupload' value='파일업로드' onClick={handleFileuploadButtonClick}>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }}
                        onChange={(e)=>handleFileChange(e)}/>
                    <FiUpload /> 파일 업로드
                </button>               
            </div>
        </div>
        {/* 처음 진입 할때, 파일 드롭 화면 */}
        {isFirst && 
        <div className='contbox'>
            <div className="ChatFileInfo">
            <label className={`preview${isActive ? ' active' : ''}`} 
              onDragEnter={handleDragStart}
              onDragLeave={handleDragEnd}
              onDrop={handleDrop}
              onDragOver={handleDragOver}> 
              <input type="file" className="chatFile" />

              {!uploadedInfo && (
                <>
                  <p className="preview_msg">
                    클릭 혹은 파일을 이곳에 드롭하세요.
                  </p>
                  <p className="preview_desc">파일당 최대 3MB</p>
                </>
              )}
            </label>
          </div>
        </div>
        }

        {!isFirst && 
        <div className='contbox'>
            <div className='theActiveHub' onClick={()=>{ setIsSideBarOpen(!isSideBarOpen);}}> 사이드 바 열기 </div>
            <div className='theActiveHub'>  </div>
            <div className='theActiveHub'>  </div>
            <div className='theActiveHub'>  </div>
            <div className='theActiveHub'>  </div>
            <div className='theActiveHub'>  </div>
            <div className='theActiveHub'>  </div>
            {/* {data.map((item:MyObject) => (    
            <div className='theActiveHub'> {item.name} </div>
            ))} */}
        </div>
        }
        
        <SideBar isOpen={isSideBarOpen} onClose={handleCloseSideBar} /> 
        {selectedFile && (  
        <div className="overlay"> 
          <UploadFile onClose={handleCloseFileUpload} oneFile={selectedFile}/> 
        </div>  )
        }
      
    </div>
    
    );
};
export default ActiveHublist;