import React, {useState, useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, } from 'recoil';
import './UploadFile.css';

import axios from 'axios';
import Cookies from 'js-cookie';
import { BiX } from "react-icons/bi";

import {MyObject} from '../../../Resources/Models';
import {tagsList, tag, UploadFileProps, imgInfoForCarselList, imgInfoForCarsel,Options} from '../../../Resources/Models';
import ConnectApi from '../../../Module/ConnectApi';
import UploadFileDataHandler from '../../../Module/UploadFileDataHandler';
import UploadedFileName from '../../Atoms/UploadedFileName';
import UploadedFileTextArea from '../../Atoms/UploadedFileTextArea';
import UploadedFileTag from '../../Atoms/UploadedFileTag';
import UploadedFileCarosel from '../../Atoms/UploadedFileCarosel';
import InputBox from '../../Atoms/InputBox/InputBox';
import Alert from '../../Modal.components/Alert/Alert';
import { ActiveHubFileListState} from '../../../Resources/Recoil';

const UploadFile: React.FC<UploadFileProps> = ({ onClose, oneFile, fileType }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [urlInfo, setInfoUrl] = useState(''); //url 입력 input
    const [description, setInfoText] = useState(''); //파일설명 input
    const [promtText, setPromtText] = useState(''); //프롬프트 textArea 
    const [tags, setTags] = useState<tagsList>([]); //태그 값들
    const [caroselNewView, setCaroselNewView] = useState(false); 
    const [draggedItem, setDraggedItem] = useState<imgInfoForCarsel |null>(null); 
    // const [listByCarosel, setListByCarosel] = useState<|>([]);
    const [images, setImages] = useState<imgInfoForCarselList>([]);
    const token = Cookies.get('accessToken');

    //textArea 영역 글자수 제한
    const [currentCount, setCurrentCount] = useState(0);
    const totalCount = 100;


    const [isButtonDisabled, setIsButtonDisabled] = useState(false); //파일 비활성화 여부
   
      const [selectList, setSelectList] = useState<Options>([
        { id: -1, name: '선택' },
        { id: -2, name: '선택하지 않음' }
      ]);
    const [selectedCaroselId, setSelectedCaroselId] = useState('-10');
    const [addCarosel, setAddCarosel] = useState(''); //허브 추가명 input 
    const [viewAlart, setViewAlart] = useState(false);//alert 활성 여부
    const [inputErrMsg, setInputErrMsg] = useState(''); //카로셀 추가시 에러메세지명
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보
    const [turn, setTurn] = useState(1);


    const setActiveHubFileListRecoil = useSetRecoilState(ActiveHubFileListState);
    const relanderingActiveHubFileList = useRecoilValue(ActiveHubFileListState);
//업로드 입력요청값 null체크
    useEffect(() => {
        function validNull(){
            switch(fileType){
                case 'doc':
                    if(description!==''&& promtText!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'img':
                    if(description!==''&& selectedCaroselId!==''){setIsButtonDisabled(true)} //태그는 선택이지 않나 ?->태호씨
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'video':
                    if(description!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'link':
                    if(description!==''&& urlInfo!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                default:
                   
                    break; 
            }
        };
        validNull();
    },[description, promtText, urlInfo, selectedCaroselId]);

//카로셀 목록(selectBox 내용) 조회.
    useEffect(() => {

        function setCaroselGroupApi() {  
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/${data.hub_id}` })
                .then((res) => {
                    const data = res.data;
                    const newList = data.map((item:any) => ({ id: item.carousel_id, name: item.carousel_name }));
                    let updatedList:Options = [...selectList];
                    updatedList = [...updatedList.slice(0, 2), ...newList];
                    setSelectList(updatedList); // 업데이트된 리스트 설정    
                })
                .catch((error) => {
                    console.error('setCaroselGroupApi/ Error occurred:', error);
                });
        };

        setCaroselGroupApi(); //카로셀 그룹 조회
    
    }, [caroselNewView]);

 //올리려는 파일의 미리보기
    useEffect(() => { 
        function getFileInfo(){ //새로 올리려는 파일 미리보기
            setImages([]);
            if (oneFile) {
                const reader = new FileReader();
                
                reader.onloadend = () => {
                    const updatedImages = []; // 이미지 배열 복사
                    updatedImages[0] = { // 기존 이미지를 덮어씌움
                        image_no: 0,
                        file_name: oneFile.name,
                        imageUrl: reader.result as string,
                        turn: 1
                    };
                     // 기존 이미지 이후의 이미지들의 turn 값을 1씩 증가시킴
                    for (let i = 1; i < updatedImages.length; i++) {
                        updatedImages[i].turn += 1;
                    }
                    setImages(updatedImages); // 이미지 상태 업데이트
                };
                reader.readAsDataURL(oneFile);
            }
        };
 //카로셀 선택 후 해당 이미지를 api로 get
        function getImgListApi() {
            
            const originImgs:any = [];
            let updatedList = [...images];
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/img/${selectedCaroselId}` })
        
            .then((res) => {
                const data: imgInfoForCarselList = res.data;
                // 이미지 다운로드 작업을 Promise 배열로 저장
                let requests = data.map((img) => {
                img.turn =img.turn+1;
                    // let sum =data.length+2
                    // img.turn =sum- img.turn;
                
                    if (img.file_url) {
                        return axios.get(img.file_url, {
                            responseType: 'blob',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then(response => {
                            // 이미지 URL을 생성하여 반환
                            return window.URL.createObjectURL(response.data);
                        }).then(result => {
                            // 이미지 정보에 URL 추가
                            img.imageUrl = result;
                            originImgs.push(img);
                        }).catch(error => {
                            console.error("에러 발생:", error);
                        });
                    }
                });
    
                // 모든 이미지 다운로드 작업이 완료될 때까지 기다림
                Promise.all(requests).then(() => {
                    if(requests.length !== 0){
                        updatedList = [...updatedList.slice(0, 1), ...originImgs];
                        updatedList.sort((a, b) => a.turn - b.turn);
                        setImages(updatedList);
                   
                    }
                    console.log("getImgListApi:");
                    console.log(images);
                });
                
            }).catch((error) => {
                console.error('getCaroselGroupApi/ Error occurred:', error);
            });
        };
        getImgListApi();
        getFileInfo();  //파일 미리보기 기능
    }, [selectedCaroselId]);
    
 //카로셀 그룹 추가
    function addCaroselGroupApi() {
       
        let sendParam={
            hub_id: data.hub_id,
            carousel_name: addCarosel,
        }
        ConnectApi({ method: 'POST', url: `/v1/api/datahub/carousel`, sendParam:sendParam})
          .then((res) => {
            console.log('/UploadFile/추가된 캐러셀 정보: '+res.data);
            setCaroselNewView(!caroselNewView);
          })
          .catch((error) => {
            console.error('addCaroselGroupApi/ Error occurred:', error);
          });
    };
//이미지 잡기
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        
        setDraggedItem(images[index]);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };   
//이미지 드롭
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    // e.preventDefault();
    if (draggedItem) {
        // let targetIndex = Number(e.dataTransfer.getData('text/plain')),
        let  updatedImages:imgInfoForCarselList= images.map((image: imgInfoForCarsel) => ({ ...image }));
          
    
    if (index > draggedItem.turn-1) {
                updatedImages[draggedItem.turn-1].turn = index+1;
                updatedImages[index].turn =draggedItem.turn;
                updatedImages.sort((a, b) => a.turn - b.turn);
    }else{
            if(index === 0){
                console.log("index가 0-----테스트완료.");
                updatedImages[0].turn = 2;
                updatedImages[draggedItem.turn-1].turn = 1;
                
                updatedImages.sort((a, b) => a.turn - b.turn);

                for (let i = 1; i < images.length; i++) {
                    updatedImages[i].turn = i+1;
                }  
               
            }else{
                console.log("=d=d=d=d=d=네번째 오타니가 첫번째가 아닌 자리로 갈때.---테스트완료.");
                if(draggedItem.turn !== images.length){
                    updatedImages[index].turn = images.length-index;
                    updatedImages[draggedItem.turn-1].turn = index+1;
                }else{
                    updatedImages[index].turn =images.length;
                    updatedImages[draggedItem.turn-1].turn =index+1;
                }
        
                updatedImages.sort((a, b) => a.turn - b.turn);
                for (let i =draggedItem.turn-1; i < images.length; i++) {
                    updatedImages[i].turn = i+1;
                }   
            };
        };
    
        let turn =updatedImages[index].turn;
        setTurn(turn);
        updatedImages.sort((a, b) => a.turn - b.turn);
       
        
        setImages(updatedImages);
        console.log(images);
        console.log(turn);
    }}; 
//파일설명 unput 이벤트
    const handleTextChange = (e:any) => {
        const newText = e.target.value;
        setInfoText(newText);
        setCurrentCount(newText.length);     
    };
//태그 추가
    const onSubmitSearch = (e:any) => {

        if (e.key === 'Enter'){
            let tagText: string |undefined = inputRef.current?.value.trim();
            let IsTag = tags.filter((tag: tag) => tag.name === tagText);
    
            if(IsTag.length === 0 && tagText){
                setTags((prevTags) => [...prevTags, { name: tagText }]);

            }else if(IsTag.length > 0){
                alert('중복을 허용하지 않습니다.');  

            }else{
                alert('한 글자 이상 입력하세요.');
            };

            if (inputRef.current) {
                inputRef.current.value = '';
            };
           
        };

    };
//태그 삭제
    const deleteTag = (index: number) =>{
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };
//캐로셀 리스트 클릭 이벤트
    function handleSelect (selectedValue:any){
        setSelectedCaroselId(selectedValue.id);
    };
//파일 저장
    async function saveFile(){
        const tagList: string[] = [];
        tags.forEach((item) => item.name && tagList.push(item.name));
        
        const boolean = await UploadFileDataHandler({classfiyType: fileType, hubId: data.hub_id,  file_tag: tagList, file_description: description,
            content:oneFile, prompt:promtText, urlInfo:urlInfo, carousel_id:Number(selectedCaroselId), turn:draggedItem? (turn):(1), url_description:description})

        if(boolean === true){
            const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
            onClose(fakeEvent);
            setActiveHubFileListRecoil(!relanderingActiveHubFileList);
        }else{
            alert('업로드 실패');
        }
        
    };
//파일 추가 버튼 이벤트
    const onSubmitAddCarosel = (e:any) => {
      let inputText = e.target.value;
      if (inputText.length > 19) {
        setInputErrMsg('최대 19자까지만 입력 가능합니다!');
        setAddCarosel(inputText.slice(0, 19));
      } else {
        setInputErrMsg('');
        setAddCarosel(inputText);
      };
    };
//url input 이벤트  
    const handleUrlChange=(e:any)=>{
        const newText = e.target.value;
        setInfoUrl(newText);
    };
//aleat 노출 유무
    const openAlart=()=>{
        setViewAlart(true);
    };

    return(
        
    <div className="FileUpload">
        {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        /> */}
        <div className="header">
            {fileType === 'link'? <ul>링크 업로드</ul>: <ul>파일 업로드</ul>}
            <button  onClick={openAlart}><BiX size={20}  /></button>
        </div>
        <div className='body'>
           {/* 파일 create */}
            {fileType === 'doc' &&oneFile &&
                <>  <UploadedFileName filename={oneFile.name} fileType={oneFile.type}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTextArea title='파일 프롬프트' placeholder='파일에 대한 프롬프트를 입력해주세요.' handleTextChange={(e)=>{ setPromtText(e.target.value);}}/>
                </>
            }
            {fileType === 'img' &&oneFile && 
                <>
                    <UploadedFileName filename={oneFile.name} fileType={oneFile.type}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                    <UploadedFileCarosel caroselNewView={caroselNewView} selected={selectedCaroselId} handleSelect={handleSelect}
                    selectList={selectList} setCaroselNewView={setCaroselNewView} images={images} handleDragStart={handleDragStart}
                    handleDrop={handleDrop}  inputRef={inputRef} onSubmitAddCarosel={onSubmitAddCarosel} 
                    addCaroselGroupApi={addCaroselGroupApi}/>
                    <span>{inputErrMsg}</span>
                </>
            }
            {fileType === 'video' &&oneFile && 
                <>
                    <UploadedFileName filename={oneFile.name} fileType={oneFile.type}/> 
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                </>
            }
            {fileType === 'link' && 
                <>
                    <InputBox type='text' title='URL' placeholder='url을 입력하세요.'handleTheTextChange={handleUrlChange} isDisabled={false}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                </>
            }
        </div>
        <div className='footer'> 
            <button className={`btn ${isButtonDisabled ? '' : 'disabled'}`} onClick={isButtonDisabled ?  saveFile : undefined }>파일 저장 </button>
        </div> 
       {viewAlart && <Alert onClose={()=>{setViewAlart(false);}} action='uploadFile' onCustomBtn={onClose}/>}
    </div>
    );
};
export default UploadFile;