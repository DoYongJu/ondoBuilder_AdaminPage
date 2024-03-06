import React, {useState, useRef, useEffect} from 'react';
import { BiX } from "react-icons/bi";
import { useLocation } from 'react-router-dom';
import './UploadFile.css';

import {MyObject} from '../../Resources/Models';
import {tagsList, tag, UploadFileProps, imgInfoForCarselList, imgInfoForCarsel} from '../../Resources/Models';
import ConnectApi from '../../Module/ConnectApi';
import UploadFileDataHandler from '../../Module/UploadFileDataHandler';
import UploadedFileName from '../Atoms/UploadedFileName';
import UploadedFileTextArea from '../Atoms/UploadedFileTextArea';
import UploadedFileTag from '../Atoms/UploadedFileTag';
import UploadedFileCarosel from '../Atoms/UploadedFileCarosel';
import InputBox from '../Atoms/InputBox/InputBox';
import Alert from '../Modal.components/Alert/Alert';



interface ImageType {
    id: number;
    name:string;
    src: string;
    order: number;
};
type ImageTypeList=ImageType[];
const UploadFile: React.FC<UploadFileProps> = ({ onClose, oneFile, fileType }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [urlInfo, setInfoUrl] = useState(''); //url 입력 input
    const [description, setInfoText] = useState(''); //파일설명 input
    const [promtText, setPromtText] = useState(''); //프롬프트 textArea 
    const [tags, setTags] = useState<tagsList>([]); //태그 값들
    const [caroselNewView, setCaroselNewView] = useState(false); 
    const [draggedItem, setDraggedItem] = useState<imgInfoForCarsel |null>(null); 
    // const [listByCarosel, setListByCarosel] = useState<|>([]);
    const [images, setImages] = useState<imgInfoForCarselList>(
        [
        // { id: 1,name: '온도로고',src: '/ondoIcon.png', order: 1 },
        // { id: 2, name: '대쉬보드 아이콘',src: '/dataHub_List_Icon.png', order: 2 },
        // { id: 3, name: '리액트로고fdjkshfjksdhfjsk',src: '/logo512.png', order: 3 },
        // { id: 4, name: '온도로고22',src: '/ondoIcon.png', order: 6 },
        // { id: 5, name: '대쉬보드 아이콘2',src: '/dataHub_List_Icon.png', order: 7 },
        // { id: 6, name: '대쉬보드 아이콘33',src: '/promtBtn.svg', order: 8 },
      ]
      );
  

    //textArea 영역 글자수 제한
    const [currentCount, setCurrentCount] = useState(0);
    const totalCount = 100;


    const [isButtonDisabled, setIsButtonDisabled] = useState(false); //파일 비활성화 여부
   
      const [selectList, setSelectList] = useState([
        { id: -1, name: '선택' },
        { id: -2, name: '선택하지 않음' }
    ]);
    const [selectedCaroselId, setSelectedCaroselId] = useState('');
    const [addCarosel, setAddCarosel] = useState(''); //허브 추가명 input 
    const [viewAlart, setViewAlart] = useState(false);//alert 활성 여부
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보

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
                    let updatedList = [...selectList];
                   // selectList 배열의 index 2부터 newList 배열을 추가
                   updatedList = [...updatedList.slice(0, 2), ...newList];

                    setSelectList(updatedList); // 업데이트된 리스트 설정
                                
                  
                })
                .catch((error) => {
                    console.error('setCaroselGroupApi/ Error occurred:', error);
                });
        };

        setCaroselGroupApi(); //카로셀 그룹 조회
    
    }, [caroselNewView]);
    
    useEffect(() => {

        function getFileInfo(){ //새로 올리려는 파일 미리보기

                if (oneFile) {
                    const reader = new FileReader();
                    
                    reader.onloadend = () => {
                        const updatedImages = [...images]; // 이미지 배열 복사
                        updatedImages[0] = { // 기존 이미지를 덮어씌움
                            image_no: 0,
                            file_name: oneFile.name,
                            file_url: reader.result as string,
                            turn: 0,
                            imageUrl:''
                        };
                        setImages(updatedImages); // 이미지 상태 업데이트
                    };
                    reader.readAsDataURL(oneFile);
                }
        };

        getFileInfo();  //파일 미리보기 기능
      
    }, [selectedCaroselId]);

    //카로셀 선택 후 해당 이미지를 api로 get ->2/29 개발 중, 추후 데이터 미리보기 및 전반적인 개발 필요. 
    useEffect(() => { 
        function getImgListApi(){
            // 실제 res Dto
            // [ case caroselId:15
            //     {
            //       "file_name": "dog1.jpg",
            //       "file_url": "undefined/datahub/file/1709189492268-dog1.jpg",
            //       "turn": 1,
            //       "image_no": 2
            //     },
            //     {
            //       "file_name": "dog1.jpg",
            //       "file_url": "undefined/datahub/file/1709188839566-dog1.jpg",
            //       "turn": 2,
            //       "image_no": 1
            //     }
            //   ]
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/img/${selectedCaroselId}` })
            .then((res) => {
                const data = res.data;
                    let updatedList = [...images];
                    // selectList 배열의 index 2부터 newList 배열을 추가
                    updatedList = [...updatedList.slice(0, 2), ...data];
                    setImages(updatedList);
                    // images.map((index,img)=>{
                    //     try {
                    //             const response = await axios.get(img., {
                    //               responseType: 'blob',
                    //               headers: {
                    //                 Authorization :`Bearer ${token}` ,
                    //               },
                    //             });
                    //             console.log("window.URL.createObjectURL(response.data): "+ window.URL.createObjectURL(response.data));
                    //             return window.URL.createObjectURL(response.data);
                    //           } catch (error) {
                    //             console.error('Error creating image:', error);
                    //             return ''; // 에러가 발생하면 빈 문자열 반환
                    //           } 
                    // })
                
                //file_url로 미리보기 예정, 다만 undefind는 백엔드에서 선행처리과정 필요.
            })
            .catch((error) => {
                console.error('getCaroselGroupApi/ Error occurred:', error);
            });
        };
        getImgListApi();
    
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

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        
        setDraggedItem(images[index]);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };   

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
            setDraggedItem(null);
        };
    };
    
    
    const handleTextChange = (e:any) => {
        const newText = e.target.value;
        setInfoText(newText);
        setCurrentCount(newText.length);     
    };

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

    const deleteTag = (index: number) =>{
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    function handleSelect (selectedValue:any){
        setSelectedCaroselId(selectedValue.id);
    };

    async function saveFile(){
        const tagList: string[] = [];
        tags.forEach((item) => item.name && tagList.push(item.name));
    
        const boolean = await UploadFileDataHandler({classfiyType: fileType, hubId: data.hub_id,  file_tag: tagList, file_description: description, 
            content:oneFile, prompt:promtText, urlInfo:urlInfo, carousel_id:Number(selectedCaroselId), turn:draggedItem? (draggedItem.turn):(0)})
        
            if(boolean === true){
            const fakeEvent = { } as React.MouseEvent<HTMLButtonElement>;
            onClose(fakeEvent);
        }else{
            alert('업로드 실패');
        }
        
    };

    const imgClicked =()=>{
        // setDraggedItem('Clicked');
    };

    const onSubmitAddCarosel = (e:any) => {
      let addC = e.target.value;
      setAddCarosel(addC);   
    };
    
    const handleUrlChange=(e:any)=>{
        const newText = e.target.value;
        setInfoUrl(newText);
    };

    const openAlart=()=>{
        setViewAlart(true);
      };

    return(
        
    <div className="FileUpload">
        <div className="header">
            <ul>파일 업로드</ul>
            <button  onClick={openAlart}><BiX size={20}  /></button>
        </div>
        <div className='body'>
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
                    handleDrop={handleDrop} imgClicked={imgClicked} inputRef={inputRef} onSubmitAddCarosel={onSubmitAddCarosel} 
                    addCaroselGroupApi={addCaroselGroupApi}/>
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
                    <InputBox type='text' title='URL' placeholder='url을 입력하세요.'handleTheTextChange={handleUrlChange}/>
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