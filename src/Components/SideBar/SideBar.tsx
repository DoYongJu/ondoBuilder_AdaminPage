import React, { useState, useEffect } from 'react';
import './SideBar.css';
import axios from "axios"
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import {dataByType} from '../../Resources/Models';
import Cookies from 'js-cookie';
import UpdateFile from '../File/UpdateFile/UpdateFile';
import { useRecoilValue, useRecoilState} from 'recoil';
import { hubClassfiyState, videoDetailsState, urlDetailsState, imgDetailsState,
  docDetailsState} from '../../Resources/Recoil';
interface SideBarProps {
    isOpen: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }


  const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const type = useRecoilValue(hubClassfiyState); //상단탭 눌렀을때 분류 타입
  const [imageSrc, setImageSrc] = useState('');
  const [openInputModal, setOpenInputModal] = useState<boolean | null>(null);
  const [changeProm, setChangeProm] = useState(false);
  const [selctedClick, setSelctedClick] = useState(false);
  const selectList=[',','다운로드','수정','삭제'],
  token = Cookies.get('accessToken');

  const docInfo = useRecoilValue(docDetailsState);
  const urlInfo = useRecoilValue(urlDetailsState);
  const videoInfo = useRecoilValue(videoDetailsState);
  const imgInfo = useRecoilValue(imgDetailsState);



   useEffect(() => {
    console.log(urlInfo);

    function chooseImgByType() {
      console.log(imgInfo);
      console.log('fileType: '+type);
      
      switch(type) {
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
    
    chooseImgByType();   
  }, [docInfo, urlInfo, imgInfo, videoInfo]); 

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
  //문서, 이미지, 비디오, url 삭제 요청 api
  function deleteImgFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/img`,
      data: {
        hub_id: imgInfo.hub_id,
        image_no: imgInfo.image_no,
        carousel_id: imgInfo.carosel_id

      }
    }).then(function (res){
      console.log(res);
      if(res.status === 200){
        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
        onClose(fakeEvent);
        //토스트메세지 출력자리
      }
    });
  };
  function deleteUrlFile(){
    axios({
      headers: { 'Authorization': `Bearer ${token}` },
      method: 'delete',
      url: `/v1/api/datahub/urlDelete`,
      data: {
        hub_id: urlInfo.hub_id,
        url_no:  urlInfo.url_no
      }
    }).then(function (res){
      if(res.data === true){
        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
        onClose(fakeEvent);
      }
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
      if(res.status === 200){
        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
        onClose(fakeEvent);
        //토스트메세지 출력자리
      }
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
      if(res.data === true){
        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
        onClose(fakeEvent);
      }
    });
  };
  function getDownloadFile(fileName: string) {
    console.log(fileName);
    axios({
      headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json; charset=utf-8', },
      method: 'GET',
      url: `/v1/api/datahub/file/${fileName}`,
      responseType: 'blob',

    }).then(function (res) {
      let fileType: string | undefined = res.headers['content-type']; 
  
      if (!fileType || fileType === 'null') {
        fileType = 'application/octet-stream'; 
      }
      const downloadUrl = window.URL.createObjectURL(new Blob([res.data],{type:fileType}));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.setAttribute('download',fileName);
      link.click();
      if(res.data === true){
        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
        onClose(fakeEvent);
      }
    }).catch((err)=>{alert(err)});;
  };
  
  function downloadFileBytype(){
    let fileName=''
    switch(type){
      case 'doc':
        fileName = docInfo.download_url.substring(docInfo.download_url.lastIndexOf('/') + 1);
        getDownloadFile(fileName);
        break;
      case 'img':
        fileName = imgInfo.download_url.substring(imgInfo.download_url.lastIndexOf('/') + 1);
        getDownloadFile(fileName)
        break;
      case 'video':
        fileName = videoInfo.download_url.substring(videoInfo.download_url.lastIndexOf('/') + 1);
        getDownloadFile(fileName)
        break;
      default: //url case
        break;
    }
  };
//사이드 바 오른쪽 상단 드롭다운 버튼 이벤트
  function handleClickeditOrDel(option:string){
    if(option === '삭제'){
      delFile();
    }else if(option === '다운로드'){
      downloadFileBytype();
    }else{
      setOpenInputModal(true);
    };
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
          <ul>{imgInfo.file_upddate? <>{imgInfo.file_regdate}</>: <>&nbsp;</>}</ul>
          <ul>{imgInfo.casosel_name}</ul>
          <ul>{imgInfo.turn} </ul>    
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
        <ul>링크 주소</ul>
        <span> {urlInfo.url_name}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 설명</ul>
        <span> {urlInfo.url_description}</span>
      </div>
      <div className='fileDescription'>
        <ul>파일 태그</ul> 
        <div className='promtArea'>{urlInfo.url_tag.replace(/[\\"{}]/g, " ")}</div>
      </div>
     </>} 
     {(openInputModal)&& (  
          <div className="overlay"> 
            <UpdateFile onClose={onClose}  fileType={type} /> 
          </div>  
        )}  
    </div>
       
  );
        
};

export default SideBar;