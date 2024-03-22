import React, {useState, useRef, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import './UpdateFile.css'; 

import { BiX } from "react-icons/bi";
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

import {MyObject} from '../../../Resources/Models';
import {tagsList, tag, UpdateFileProps, imgInfoForCarselList, imgInfoForCarsel,Options} from '../../../Resources/Models';
import ConnectApi from '../../../Module/ConnectApi';
import UploadedFileName from '../../Atoms/UploadedFileName';
import UploadedFileTextArea from '../../Atoms/UploadedFileTextArea';
import UploadedFileTag from '../../Atoms/UploadedFileTag';
import UploadedFileCarosel from '../../Atoms/UploadedFileCarosel';
import InputBox from '../../Atoms/InputBox/InputBox';
import Alert from '../../Modal.components/Alert/Alert';
import { videoDetailsState, urlDetailsState, imgDetailsState,hubClassfiyState,
     docDetailsState, ActiveHubFileListState} from '../../../Resources/Recoil';

const UpdateFile: React.FC<UpdateFileProps> = ({ onClose, fileType}) => {
    
    const token = Cookies.get('accessToken');
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보

//파일 업데이트 관련 recoilState value
    const docRecoilInfo = useRecoilValue(docDetailsState),
     urlRecoilInfo = useRecoilValue(urlDetailsState),
     videoRecoilInfo = useRecoilValue(videoDetailsState),
     imgRecoilInfo = useRecoilValue(imgDetailsState);
//카로셀 리스트 초기값.     
    const [selectList, setSelectList] = useState<Options>([
        { id: imgRecoilInfo.carosel_id?(imgRecoilInfo.carosel_id):(-2), name: imgRecoilInfo.casosel_name?(imgRecoilInfo.casosel_name):("설정되지 않음") },
      ]);
//업데이트에 대한 정보 변수. 
    const inputRef = useRef<HTMLInputElement>(null),
     [urlInfo, setInfoUrl] = useState(''), //url 입력 input
     [description, setInfoText] = useState(''), //파일설명 textArea
     [currentCount, setCurrentCount] = useState(0), //파일설명 textArea 영역 글자수
     totalCount = 100, //파일설명 textArea 영역 글자수 제한
     [promtText, setPromtText] = useState(''), //프롬프트 textArea 
     [tags, setTags] = useState<tagsList>([]), //태그 값들
     [draggedItem, setDraggedItem] = useState<imgInfoForCarsel |null>(null), //카로셀에서 이동하려고 집은 이미지.
     [turn, setTurn] = useState(0), //수정할 이미지파일의 turn 값.
     type = useRecoilValue(hubClassfiyState), //상단탭 눌렀을때 분류 타입
     [inputErrMsg, setInputErrMsg] = useState(''), //카로셀 추가시 에러메세지명
     [images, setImages] = useState<imgInfoForCarselList>([]),// 카로셀별 이미지 배열
     [addCarosel, setAddCarosel] = useState(''); //허브 추가명 input 
    
//보여 줄지 말지에 대한 상태값 관련.
    const [isButtonDisabled, setIsButtonDisabled] = useState(false), //파일 비활성화 여부
    [caroselNewView, setCaroselNewView] = useState(false),
    [selectedFile, setSelectedFile] = useState<File | null>(null),
     [viewAlart, setViewAlart] = useState(false);//alert 활성 여부

//파일 업로드시
    const fileInputRef = useRef<HTMLInputElement | null>(null);
 
//랜더링 변수
    const setActiveHubFileListRecoil = useSetRecoilState(ActiveHubFileListState);
    const relanderingActiveHubFileList = useRecoilValue(ActiveHubFileListState);

//입력값 null체크
    useEffect(() => { 

        function validNull(){
            switch(fileType){
                case 'doc':
                    if(description!==''&& promtText!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'img':
                    if(description!==''){setIsButtonDisabled(true)} 
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'video':
                    if(description!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                case 'url':
                    if(description!==''){setIsButtonDisabled(true)}
                    else{setIsButtonDisabled(false)} 
                    break;
                default:
                   
                    break; 
            }
        };
        validNull();
    },[description, promtText, urlInfo]);
    useEffect(()=>{
        function parseStringToCarouselArray(originTags:string) {
         
            // 문자열에서 불필요한 문자(따옴표 및 중괄호)를 제거
            const cleanedStr = originTags.replace(/[{}"]/g, '');
    
            // 쉼표를 기준으로 문자열을 나누어 배열로 변환
            const resultArray = cleanedStr.split(',');
            const tagList: tag[] = resultArray.map(name => ({ name }));
            setTags(tagList);
        }
        switch(fileType){
            case 'doc':
                setCurrentCount(docRecoilInfo.file_description.length);
                break;
            case 'img':
                parseStringToCarouselArray(imgRecoilInfo.file_tag);
                setCurrentCount(imgRecoilInfo.file_description.length);
                break;
            case 'video':
                parseStringToCarouselArray(videoRecoilInfo.file_tag);
                setCurrentCount(videoRecoilInfo.file_description.length);
                break;
            case 'url':
                parseStringToCarouselArray(urlRecoilInfo.url_tag);
                setCurrentCount(urlRecoilInfo.url_description.length);
                break;
            default:
                break; 
        }
    },[]);

//카로셀 선택 후 해당 이미지를 api로 get
    useEffect(() => { 

        function getImgListApi() {
            console.log('selectedCaroselId: '+ imgRecoilInfo.carosel_id)
            const originImgs:any = [];
            let updatedList = [...images];
            if(type === 'img' && imgRecoilInfo.carosel_id!== null){
                ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/img/${imgRecoilInfo.carosel_id}` })
        
                .then((res) => {
                    const data: imgInfoForCarselList = res.data;
                    // 이미지 다운로드 작업을 Promise 배열로 저장
                    let requests = data.map((img) => {
                    
                        // let sum =data.length+1
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
                    });
       
                    
                }).catch((error) => {
                    console.error('getCaroselGroupApi/ Error occurred:', error);
                });
            }
            
        };
        getImgListApi();
    }, [imgRecoilInfo.carosel_id]);

    useEffect(() => { },[images])

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
    if (draggedItem?.image_no === imgRecoilInfo.image_no) {
        let  updatedImages = images.map((image) => ({ ...image }));
          
    
    if (index > draggedItem.turn-1) {
                updatedImages[draggedItem.turn-1].turn = index+1;
                updatedImages[index].turn =draggedItem.turn;
                updatedImages.sort((a, b) => a.turn - b.turn);
    }else{
            if(index === 0){
                updatedImages[0].turn = 2;
                updatedImages[draggedItem.turn-1].turn = 1;
                updatedImages.sort((a, b) => a.turn - b.turn);

                for (let i = 1; i < images.length; i++) {
                    updatedImages[i].turn = i+1;
                };  
               
            }else{
                if(draggedItem.turn !== images.length){
                    updatedImages[index].turn = images.length-index;
                    updatedImages[draggedItem.turn-1].turn = index+1;
                }else{
                    updatedImages[index].turn =images.length;
                    updatedImages[draggedItem.turn-1].turn =index+1;
                };
        
                updatedImages.sort((a, b) => a.turn - b.turn);
                for (let i =draggedItem.turn-1; i < images.length; i++) {
                    updatedImages[i].turn = i+1;
                }; 
            };
        };
        setTurn(updatedImages[index].turn);
        updatedImages.sort((a, b) => a.turn - b.turn);
        setImages(updatedImages);
    }};
//파일설명 onChange 이벤트    
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
    //사용하지 않는 기능.    
    };
//파일 수정 요청
    function saveFile(){
        switch(type){
            case 'video':
                patchVideoFile();
                break;
            case 'img':
                patchImgFile();
                break;
            case 'url':
                patchUrlFile();
                break;
            case 'doc':
                patchDocFile();
                break;
            default:
                break;
        }
    };
//doc 수정 patch api
    async function patchDocFile(){
        const formData = new FormData();
        if(!selectedFile){ //파일 교체 케이스
            let file = await makeImgObjectFile();
            formData.append('hub_id', String(docRecoilInfo.hub_id));
            formData.append('doc_no', String(docRecoilInfo.doc_no));
            formData.append('file_description', description);
            formData.append('prompt', promtText);
            formData.append('doc', file);
        }else{
            formData.append('hub_id', String(docRecoilInfo.hub_id));
            formData.append('doc_no', String(docRecoilInfo.doc_no));
            formData.append('file_description', description);
            formData.append('prompt', promtText);
            formData.append('doc', selectedFile);
        };
       
       
        try {
            const response = await axios.patch(`/v1/api/datahub/doc`, formData,{
                headers: { 'Authorization': `Bearer ${token}`,
                            'Content-Type' : `multipart/form-data`,
                            'charset':'utf-8'},    
                }).then(function (res){
                    if(res.status === 200){
                        const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                        onClose(fakeEvent);
                        setActiveHubFileListRecoil(!relanderingActiveHubFileList)
                    }
              });

            console.log(response);
          } catch (error) {
            console.error("데이터를 불러오는 데 실패했습니다:", error);
          };
        
        
          
    };
//url 수정 patch api
    function patchUrlFile(){
        const tagList: string[] = []; 
        tags.forEach((item) => item.name && tagList.push(item.name));

        axios({
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'patch',
            url: `/v1/api/datahub/urlUpdate`,
            data:  {
                hub_id:urlRecoilInfo.hub_id,
                url_name:urlRecoilInfo.url_name,
                url_no:urlRecoilInfo.url_no,
                url_description:description,
                url_tag: tagList,
            }
          }).then(function (res){
            if(res.status === 200){
                const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                onClose(fakeEvent);
                setActiveHubFileListRecoil(!relanderingActiveHubFileList);
            }
          });  
    };
//이미지 파일 수정 patch api===>03.20카로셀이 없는 이미지 수정이 미흡
    function patchImgFile(){
        const tagList: string[] = [];
        tags.forEach((item) => item.name && tagList.push(item.name));
        if(imgRecoilInfo.carosel_id === null){
            axios({
                headers: { 'Authorization': `Bearer ${token}`, 'charset':'utf-8' },
                method: 'patch',
                url: `/v1/api/datahub/img`,
                data:  {
                    hub_id:imgRecoilInfo.hub_id,
                    image_no:imgRecoilInfo.image_no,
                    file_tag:tagList,
                    file_description: description,
                }
    
              }).then(function (res){
                if(res.status === 200){
                    const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                    onClose(fakeEvent);
                    setActiveHubFileListRecoil(!relanderingActiveHubFileList)
                }
              }); 
        }else{
            axios({
                headers: { 'Authorization': `Bearer ${token}`, 'charset':'utf-8' },
                method: 'patch',
                url: `/v1/api/datahub/img`,
                data:  {
                    hub_id:imgRecoilInfo.hub_id,
                    image_no:imgRecoilInfo.image_no,
                    file_tag:tagList,
                    file_description: description,
                    turn: turn,
                    carousel_id: imgRecoilInfo.carosel_id,
                }
    
              }).then(function (res){
                if(res.status === 200){
                    const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
                    onClose(fakeEvent);
                    setActiveHubFileListRecoil(!relanderingActiveHubFileList)
                }
              }); 
        }


    };
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
        if(res.status === 200){
            const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
            onClose(fakeEvent);
            setActiveHubFileListRecoil(!relanderingActiveHubFileList)
        }
      }).catch(err =>{alert(err)});
    };
//서류 파일 생성
    async function makeImgObjectFile(){
        console.log("makeImgObjectFile start")
        console.log(docRecoilInfo);
        let temp = docRecoilInfo.download_url.split('/');;
        let fileName = temp[temp.length - 1];
        let theFileType=fileName.substring(fileName.lastIndexOf('.') + 1);
        
        console.log('theFileType: '+ theFileType);
    let data= '';
    await axios({
            headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json; charset=utf-8', },
            method: 'GET',
            url: `/v1/api/datahub/file/${fileName}`,
            responseType: 'blob',
      
            }).then(function (res) {
            data= res.data;
            console.log(res.data);
            let fileType: string | undefined = res.headers['content-type']; 
        
            if (!fileType || fileType === 'null') {
              fileType = 'application/octet-stream'; 
            }
            return new File([res.data], docRecoilInfo.file_name, { type: `doc/${theFileType}` });
            }).catch((err)=>{alert(err);  });

        return new File([data], docRecoilInfo.file_name, { type:  `doc/${theFileType}` });
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
    }

  
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
//주어진 다운로드 url을 입력값으로 파일 타입 추출
    function splitFileType(url:string){
        let temp = url.split('/');;
        const fileName = temp[temp.length - 1];
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    };
//파일업로드버튼 클릭 이벤트
    const handleFileuploadButtonClick =()=>{
    if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
//선택된 파일을 사이즈 검사를 시키며 value초기화
    const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    validateFile(file);
    e.target.value = '';  
    };
//문서 파일 타입과 사이즈 유효성 검사
    function validateFile(file:File){
    const fileType = file.type;
    const fileSize = file.size;
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
      }else if(fileSize >= 5 * 1024 * 1024){
        alert('이미지 파일의 크기는 최대 5MB를 초과할 수 없습니다.');
      }else{
        setSelectedFile(file);
      }
    };
  
    return(
        
    <div className="FileUpdate">
        <div className="header">
            {fileType === 'link'? <ul>링크 수정</ul>: <ul>파일 수정</ul>}
            <button  onClick={openAlart}><BiX size={20}  /></button>
        </div>
        <div className='body'>

            {fileType === 'doc' &&
                <>  
                    <UploadedFileName filename={docRecoilInfo.file_name} fileType={docRecoilInfo.download_url.substring(docRecoilInfo.download_url.lastIndexOf('.') + 1)}/>
                    <button className="updateFileBtn"  onClick={handleFileuploadButtonClick}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e)=>handleFileChange(e)}/>파일 선택
                    </button>{selectedFile ? (<span>{selectedFile.name}</span>) : (<span>선택된 파일 없음</span>)}
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' inputValue={docRecoilInfo.file_description} currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTextArea title='파일 프롬프트' placeholder='파일에 대한 프롬프트를 입력해주세요.' inputValue={docRecoilInfo.file_prompt} handleTextChange={(e)=>{ setPromtText(e.target.value);}}/>
                </>


            }
            {fileType === 'img'&& 
                <>
                    <UploadedFileName filename={imgRecoilInfo.file_name} fileType={splitFileType(imgRecoilInfo.download_url)}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange} inputValue={imgRecoilInfo.file_description}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag} originTags={imgRecoilInfo.file_tag}/>
                    <UploadedFileCarosel caroselNewView={caroselNewView} selected={String(imgRecoilInfo.carosel_id)} handleSelect={handleSelect}
                    selectList={selectList} setCaroselNewView={setCaroselNewView} images={images} handleDragStart={handleDragStart}
                    handleDrop={handleDrop}  inputRef={inputRef} onSubmitAddCarosel={onSubmitAddCarosel} 
                    addCaroselGroupApi={addCaroselGroupApi}/>
                    <span className='errMsg'>{inputErrMsg}</span>
                </>
            }
            {fileType === 'url' && 
                <>
                    <InputBox type='text' title='URL' placeholder={urlRecoilInfo.url_name} handleTheTextChange={handleUrlChange} isDisabled ={true}/>
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange} inputValue={urlRecoilInfo.url_description}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag} originTags={urlRecoilInfo.url_tag}/>
                </>
            }

          
            {fileType === 'video' &&
                <>
                    <UploadedFileName filename={videoRecoilInfo.file_name} fileType={videoRecoilInfo.download_url}/> 
                    <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}  inputValue={videoRecoilInfo.file_description}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag} originTags={videoRecoilInfo.file_tag}/>
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