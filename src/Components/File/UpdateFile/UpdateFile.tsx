import React, {useState, useRef, useEffect} from 'react';
import { BiX } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './UpdateFile.css'; //안만들었는데 잘됨. id가 같아서 물려 들어가는듯. 추가 css 파일 작성 예정
import Cookies from 'js-cookie';

import {MyObject} from '../../../Resources/Models';
import {tagsList, tag, UploadFileProps, imgInfoForCarselList, imgInfoForCarsel,Options, Option} from '../../../Resources/Models';
import ConnectApi from '../../../Module/ConnectApi';
import UploadFileDataHandler from '../../../Module/UploadFileDataHandler';
import UploadedFileName from '../../Atoms/UploadedFileName';
import UploadedFileTextArea from '../../Atoms/UploadedFileTextArea';
import UploadedFileTag from '../../Atoms/UploadedFileTag';
import UploadedFileCarosel from '../../Atoms/UploadedFileCarosel';
import InputBox from '../../Atoms/InputBox/InputBox';
import Alert from '../../Modal.components/Alert/Alert';
import { useRecoilValue, useSetRecoilState, } from 'recoil';
import { videoDetailsState, urlDetailsState, imgDetailsState,
     docDetailsState, ActiveHubFileListState} from '../../../Resources/Recoil';

const UpdateFile: React.FC<UploadFileProps> = ({ onClose, oneFile, fileType}) => {
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
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보

    //파일 업데이트 관련
    const docRecoilInfo = useRecoilValue(docDetailsState);
    const urlRecoilInfo = useRecoilValue(urlDetailsState);
    const videoRecoilInfo = useRecoilValue(videoDetailsState);
    const imgRecoilInfo = useRecoilValue(imgDetailsState);

    const setActiveHubFileListRecoil = useSetRecoilState(ActiveHubFileListState);
    const relanderingActiveHubFileList = useRecoilValue(ActiveHubFileListState);

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

    useEffect(() => {

        function setCaroselGroupApi() {  //카로셀 목록(selectBox 내용) 조회.
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/${data.hub_id}` })
                .then((res) => {
                    const data = res.data;
                    const newList = data.map((item:any) => ({ id: item.carousel_id, name: item.carousel_name }));
                    let updatedList:Options = [...selectList];
                   // selectList 배열의 index 2부터 newList 배열을 추가
                    updatedList = [...updatedList.slice(0, 2), ...newList];
                    setSelectList(updatedList); // 업데이트된 리스트 설정
                    // caroselRecoilInfo(updatedList); //리코일로 관리, 추후 사이드바에서 필요
                   
                    
                })
                .catch((error) => {
                    console.error('setCaroselGroupApi/ Error occurred:', error);
                });
        };

        setCaroselGroupApi(); //카로셀 그룹 조회
    
    }, [caroselNewView]);

    //카로셀 선택 후 해당 이미지를 api로 get
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
                        console.log("===========");
                        console.log(updatedImages);
                        updatedImages[i].turn += 1;
                        console.log(updatedImages);
                    }
                    setImages(updatedImages); // 이미지 상태 업데이트
                    console.log("*****");
                    console.log(updatedImages);
                    console.log(images);
                };
                reader.readAsDataURL(oneFile);
            }
        };

        function getImgListApi() {
            
            const originImgs:any = [];
            let updatedList = [...images];
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/img/${selectedCaroselId}` })
        
            .then((res) => {
                const data: imgInfoForCarselList = res.data;
                // 이미지 다운로드 작업을 Promise 배열로 저장
                let requests = data.map((img) => {
                
                    let sum =data.length+2
                    img.turn =sum- img.turn;
                   
          
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
        e.preventDefault();
        if (draggedItem) {
            let targetIndex = Number(e.dataTransfer.getData('text/plain')),
                updatedImages = images.map((image) => ({ ...image }));
           
            // 현재 드래그한 이미지의 정보를 대상 이미지의 위치로 업데이트
            updatedImages.splice(targetIndex > index ? index : index+1 , 0, { ...draggedItem, turn: updatedImages[index].turn });
            // 대상 이미지의 정보를 드래그한 이미지의 위치로 업데이트
            updatedImages.splice(targetIndex > index ? targetIndex + 1 : targetIndex, 1);
            
            // 재조정된 순서값을 적용
            updatedImages.forEach((image, i) => {
                image.turn = i + 1;
            });
            
            setImages(updatedImages);
            console.log(images);
            setDraggedItem(null);
        };
    };
     
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
//파일 수정 요청
    function saveFile(){
        patchVideoFile();
        // let object:File|null= await makeVideoObjectFile();
        // if(object !== null){
        //     patchVideoFile(object);
        // }
        
        
    };
    //비디오 파일 생성
    // async function makeVideoObjectFile(){
    //     const fileName = videoRecoilInfo.download_url.substring(videoRecoilInfo.download_url.lastIndexOf('/') + 1); 
    //     let theFileType=fileName.substring(fileName.lastIndexOf('.') + 1);
        
    //     console.log('theFileType: '+ theFileType);
    // let data= '';
    // await axios({
    //         headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json; charset=utf-8', },
    //         method: 'GET',
    //         url: `/v1/api/datahub/file/${fileName}`,
    //         responseType: 'blob',
      
    //         }).then(function (res) {
    //         data= res.data;
    //         console.log(res.data);
    //         let fileType: string | undefined = res.headers['content-type']; 
        
    //         if (!fileType || fileType === 'null') {
    //           fileType = 'application/octet-stream'; 
    //         }
    //         return new File([res.data], videoRecoilInfo.file_name, { type: 'video/mp4' });
    //         }).catch((err)=>{alert(err);  });

    //     return new File([data], videoRecoilInfo.file_name, { type: 'video/mp4' });
    // };
    //비디오파일 수정 api
    function patchVideoFile(){
        const tagList: string[] = [];
        tags.forEach((item) => item.name && tagList.push(item.name));
        axios({
            headers: { 'Authorization': `Bearer ${token}`},
            method: 'patch',
            url: `/v1/api/datahub/video`,
            data:  {
                hub_id:videoRecoilInfo.hub_id,
                video_no:videoRecoilInfo.video_no,
                file_tag:tagList,
                file_description: description,
            }
          }
          ).then(function (res){

            const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
            onClose(fakeEvent);
            setActiveHubFileListRecoil(!relanderingActiveHubFileList)
          }).catch(err =>{alert(err)});
    }
    // function patchVideoFile(file:File){ //doc에서 사용 예정
    //     console.log(file);
    //     const formData = new FormData();
    //     formData.append('hub_id', String(videoRecoilInfo.hub_id));
    //     formData.append('video_no', String(videoRecoilInfo.video_no));
    //     formData.append('file_tag', String(videoRecoilInfo.file_tag));
    //     formData.append('file_description', String(videoRecoilInfo.file_description));
    //     formData.append('video', file);

    //     axios({
    //         headers: { 'Authorization': `Bearer ${token}` , 'Content-Type':`multipart/form-data`},
    //         method: 'patch',
    //         url: `/v1/api/datahub/video`,
    //         data:  formData,
    //       }
    //       ).then(function (res){

    //         const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
    //         onClose(fakeEvent);
    //       }).catch(err =>{alert(err)});
    // }
//파일 추가 버튼 이벤트
    const onSubmitAddCarosel = (e:any) => {
      let addC = e.target.value;
      setAddCarosel(addC);   
    };
    
    const handleUrlChange=(e:any)=>{
        const newText = e.target.value;
        setInfoUrl(newText);
    };
//aleat 노출 유무
    const openAlart=()=>{
        setViewAlart(true);
    };

    return(
        
    <div className="FileUpdate">
        <div className="header">
            {fileType === 'link'? <ul>링크 수정</ul>: <ul>파일 수정</ul>}
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
                </>
            }
            {fileType === 'link' && 
                <>
                    <InputBox type='text' title='URL' placeholder='url을 입력하세요.'handleTheTextChange={handleUrlChange}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                </>
            }

            {/* 파일 update */}
            {fileType === 'video' &&
                <>
                    <UploadedFileName filename={videoRecoilInfo.file_name} fileType={videoRecoilInfo.download_url}/> 
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                </>
            }
        </div>
        <div className='footerUpdate'> 
            <button className={`btn ${isButtonDisabled ? '' : 'disabled'}`} onClick={isButtonDisabled ?  saveFile : undefined }>파일 수정 </button>
        </div> 
       {viewAlart && <Alert onClose={()=>{setViewAlart(false);}} action='uploadFile' onCustomBtn={onClose}/>}
    </div>
    );
};
export default UpdateFile;