import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { BiX } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';
import './UploadFile.css';

import {MyObject} from '../../Resources/Models';
import {tagsList, tag, UploadFileProps, selCaroselGroupList} from '../../Resources/Models';
import ConnectApi from '../../Module/ConnectApi';
import UploadFileDataHandler from '../../Module/UploadFileDataHandler';
import UploadedFileName from '../Atoms/UploadedFileName';
import UploadedFileTextArea from '../Atoms/UploadedFileTextArea';
import UploadedFileTag from '../Atoms/UploadedFileTag';
import UploadedFileCarosel from '../Atoms/UploadedFileCarosel';



interface ImageType {
    id: number;
    name:string;
    src: string;
    order: number;
};

const UploadFile: React.FC<UploadFileProps> = ({ onClose, oneFile, fileType }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [urlInfo, setInfoUrl] = useState(''); //url 입력 input
    const [description, setInfoText] = useState(''); //파일설명 input
    const [promtText, setPromtText] = useState(''); //프롬프트 textArea 
    const [caroselNewView, setCaroselNewView] = useState(false);  
    const [currentCount, setCurrentCount] = useState(0);
    const [tags, setTags] = useState<tagsList>([]);
    const totalCount = 100;
    const [draggedItem, setDraggedItem] = useState<ImageType | null>(null);
    const [images, setImages] = useState([
        { id: 1,name: '온도로고',src: '/ondoIcon.png', order: 1 },
        { id: 2, name: '대쉬보드 아이콘',src: '/dataHub_List_Icon.png', order: 2 },
        { id: 3, name: '리액트로고fdjkshfjksdhfjsk',src: '/logo512.png', order: 3 },
        { id: 4, name: '강아지',src: '/dog1.jpg', order: 4 },
        { id: 5, name: '강아지222',src: '/dog1.jpg', order: 5 },
        { id: 6, name: '온도로고22',src: '/ondoIcon.png', order: 6 },
        { id: 7, name: '대쉬보드 아이콘2',src: '/dataHub_List_Icon.png', order: 7 },
        { id: 8, name: '대쉬보드 아이콘33',src: '/promtBtn.svg', order: 8 },
      ]);
      const [selectList, setSelectList] = useState([
        { id: -1, name: '선택' },
        { id: -2, name: '선택하지 않음' }
    ]);
    const [selectedCaroselId, setSelectedCaroselId] = useState('');
    const [addCarosel, setAddCarosel] = useState('');
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보

    
    useEffect(() => {

        function setCaroselGroupApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/${data.hub_id}` })
                .then((res) => {
                    const data = res.data;
                    const newList = data.map((item:any) => ({ id: item.carousel_id, name: item.carousel_name }));
                    setSelectList(prevList => [...prevList, ...newList]);
                })
                .catch((error) => {
                    console.error('getCaroselGroupApi/ Error occurred:', error);
                });
        };

        function getFileInfo(){
            if (oneFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    images.push({ id: 0 ,name: oneFile.name, src:reader.result as string, order: images.length+1 },)
                };
                reader.readAsDataURL(oneFile);
            }
        };

        setCaroselGroupApi(); //카로셀 그룹 조회
        getFileInfo();  //파일 미리보기 기능
    }, []);

    //카로셀 선택 후 해당 이미지를 api로 get ->2/21 개발 중, 추후 데이터 확인 필요. 
    useEffect(() => { 
        function getImgListApi(){
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/datahub/carouser/img/${selectedCaroselId}` })
            .then((res) => {
                const data = res.data;
                // const newList = data.map((item:any) => ({ id: item.carousel_id, name: item.carousel_name }));
                // setSelectList(prevList => [...prevList, ...newList]); 이해 안됨... 대호씨 문의해봐야 함 왜 캐로셀 조회랑 res가 똑같은지,
                //id 와 name 으로 미리보기가 가능한지 테스트 필요
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
            console.log(res.data);
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
            updatedImages.splice(targetIndex > index ? index : index+1 , 0, { ...draggedItem, order: updatedImages[index].order });
            // 대상 이미지의 정보를 드래그한 이미지의 위치로 업데이트
            updatedImages.splice(targetIndex > index ? targetIndex + 1 : targetIndex, 1);
            
            // 재조정된 순서값을 적용
            updatedImages.forEach((image, i) => {
                image.order = i + 1;
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
        console.log(selectedCaroselId);
    };

    const saveFile = () => {
        const tagList: string[] = [];
        tags.forEach((item) => item.name && tagList.push(item.name));
        
        UploadFileDataHandler({classfiyType: fileType, hubId: data.hub_id,  file_tag: tagList, file_description: description, doc:oneFile})
        // console.log('Updated Images:', images);
    };

    const imgClicked =()=>{
        // setDraggedItem('Clicked');
    };

    const onSubmitAddCarosel = (e:any) => {
       
        if (inputRef.current) {
            const inputValue: string = inputRef.current?.value; 
            if (e.key === 'Enter'){
                setAddCarosel(inputValue);
                e.preventDefault();
            };

            setAddCarosel(inputValue);
            };
    };

    return(
        
    <div className="FileUpload">
        <div className="header">
            <ul>파일 업로드</ul>
            <button  onClick={onClose}><BiX size={20}  /></button>
        </div>
        <div className='body'>
            {fileType === 'doc' &&oneFile && //해야해...
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
                    <div className='linkArea'>
                        <div className='linktitle'><ul>URL 입력</ul></div>
                        <div className='linkbody'>
                        <div><input type="text"  placeholder="URL을 입력 해주세요." onChange={(e)=>{setInfoUrl(e.target.value)}} /></div>
                        </div>
                     </div>
                     <UploadedFileTextArea totalCount={totalCount} title='파일설명' placeholder='파일에 대한 설명을 입력해주세요.' currentCount={currentCount} handleTextChange={handleTextChange}/>
                    <UploadedFileTag inputRef={inputRef} tags={tags} onSubmitSearch={onSubmitSearch} deleteTag={deleteTag}/>
                </>
            }
        </div>
        <div className='footer'> 
                    <button onClick={saveFile}>파일 저장 </button>
        </div> 
       
    </div>
    );
};
export default UploadFile;