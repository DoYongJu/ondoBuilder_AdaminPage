import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { BiX } from "react-icons/bi";
import { useNavigate, useLocation } from 'react-router-dom';
import './UploadFile.css';
import SelectBox from '../SelectBox/SelectBox';
import {MyObject} from '../../Resources/Models';
import {tagsList, tag, UploadFileProps, selCaroselGroupList} from '../../Resources/Models';
import ConnectApi from '../../Module/ConnectApi';


interface ImageType {
    id: number;
    name:string;
    src: string;
    order: number;
};

const UploadFile: React.FC<UploadFileProps> = ({ onClose, oneFile }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setInfoText] = useState(''); 
    const [caroselNewView, setCaroselNewView] = useState(false);  
    const [currentCount, setCurrentCount] = useState(0);
    const [tags, setTags] = useState<tagsList>([]);
    const totalCount = 100;
    const [draggedItem, setDraggedItem] = useState<ImageType | null>(null);
    const [imageSrc, setImageSrc]: any = useState(null);
    const [caroselList, setCaroselList] = useState<selCaroselGroupList | null>(null);
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
    let selectList = ['선택', '선택하지 않음', '캐로셀01'];
    const [selected, setSelected] = useState('');
    const [addCarosel, setAddCarosel] = useState('');
    const location = useLocation();
    const data:MyObject= location.state; //허브 정보
    useEffect(() => {
        //카로셀 그룹 조회->데이터 확인 완료 
        function selectCaroselGroupApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/carousel/${data.hub_id}`})
                .then((res) => {
                    console.log(res.data);
                    setCaroselList(res.data);
                })
                .catch((error) => {
                    // API 요청이 실패했을 때 처리할 로직
                    console.error('Error occurred:', error);
                });
        };
    
        selectCaroselGroupApi();
    
    }, []);
    
    useEffect(() => {
        if (caroselList) {
            caroselList.map((item, index) => (selectList= [...selectList, item.carousel_name]));
        }
    }, [caroselList]);
  
    //카로셀 그룹 추가->데이터 확인 완료 
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
            // API 요청이 실패했을 때 처리할 로직
            console.error('addCaroselGroupApi/ Error occurred:', error);
          });
      };

    //파일 미리보기 기능
    useEffect(() => {
        const getFileInfo = () => {
            if (oneFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result as string);
                };
                reader.readAsDataURL(oneFile);
            }
        };
      
        getFileInfo();
    }, [oneFile]);
    async function uploadFileApi() {

        const sendParam = {
        //   email: email,
        //   password: password,
        };
  
        await axios({
          method: '파일 올리는 api',
          url: process.env.REACT_APP_UPLOAD_API,
          headers: {"accept": 'application/json', 'Content-Type': 'application/json'},
          data: sendParam
          
        }).then(response => {
            //console.log(response) => ? 
 
          
        }).catch(error =>{
          if (error.response && error.response.status === 400 && error.response.data.message === "user_verify value Error"){
           console.log('axios 과정중 에러발생 uploadFile 확인-yong')
          };
         
        });
  
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedItem(images[index]);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };   

    const handleDrop = (e:  React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        // console.log('before changed'+images);
        if (draggedItem) {
            let targetIndex = Number(e.dataTransfer.getData('text/plain')),
                updatedImages = images.map((image) => ({ ...image }));
    
            // 현재 드래그한 이미지의 정보를 대상 이미지의 위치로 업데이트
            updatedImages.splice(index, 0, { ...draggedItem, order: updatedImages[index].order });
            // 대상 이미지의 정보를 드래그한 이미지의 위치로 업데이트
            updatedImages.splice(targetIndex + (targetIndex > index ? 1 : 0), 1);
    
            // 재조정된 순서값을 적용
            updatedImages.forEach((image, i) => {
                image.order = i + 1;
            });

            setImages(updatedImages);
            setDraggedItem(null);
            // console.log('after changed'+updatedImages);
        }
       
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
        console.log('selectedValue'+selectedValue);
        setSelected(selectedValue);
    };

    const saveFile = () => {

        console.log('Updated Images:', images);
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
            <div className='FileUploadtitle'>
                <div className='key'>
                    <ul>파일 이름</ul>
                    <ul>확장자</ul>
                </div>
                <div className='value'>
                    <ul>{oneFile.name}</ul>
                    <ul>{oneFile.type}</ul>
                </div>
            </div>
            <div className='FileUploadInfo'>
                <div className='FileUploadtitle'>
                    <ul>파일 설명</ul>
                    
                </div>
                <div className='fileTextArea'>
                    <textarea  maxLength={totalCount} onChange={handleTextChange} placeholder={'입력하세요.'}></textarea>
                    <span>{currentCount}/{totalCount}(글자수)</span>
                </div>
            </div>
            <div className='FileTag'>
               <div className='FileTagtitle'><ul>태그</ul></div>
               <div className='FileTagbody'>
                <div><input type="text"  placeholder="엔터로 태그를 등록해주세요." ref={inputRef} onKeyPress={onSubmitSearch} /></div>
                <div className='tagListArea'>
                    {tags.map((option, index) => (
                            <div key={index} className='theItem'>
                                <ul>
                                    <li>{option.name}</li>
                                    <li><span onClick={()=>deleteTag(index)}><BiX size={18}/></span></li>
                                </ul>
                            </div>
                        ))}
                </div>
               </div>
            </div>
            <div className='caroselArea'>
              <div className='caroselTitle'>카로셀</div>
              {!caroselNewView&&
                <div className='selectAndMoveArea'>
                    <div className='caroselInputAreaSelect'>
                        <div className='selectBoxArea'> 
                        <SelectBox handleSelect ={handleSelect} selectList={selectList}/>
                        </div>
                        <button onClick={()=>{setCaroselNewView(!caroselNewView)}}>카로셀 추가</button>
                    </div>
                    {(selected&& selected!='선택하지 않음')&&
                    <div className='moveCaroselArea'>
                        {images.map((img, index) => (
                            <>
                            <div className='img' key={index} draggable onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e)=>{ e.preventDefault()}} onDrop={(e) => handleDrop(e, index)}
                                onClick={imgClicked}>
                                <div className='imgArea' >
                                    <img style={{width:'102px', height:'102px' }} src={process.env.PUBLIC_URL +img.src}/>
                                    <div className="image-number">{img.order}</div>
                                    <ul >{img.name}</ul>
                                </div>
                            </div>
                            {index === images.length - 1 && (
                                <>
                                <div className='img' key={index} draggable onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e)=>{ e.preventDefault()}} onDrop={(e) => handleDrop(e, index)}
                                onClick={imgClicked}>
                                    <div className='imgArea' > 
                                        <img style={{width:'102px', height:'102px' }} src={imageSrc}/>
                                        <div className="image-number">{images.length+1}</div>
                                        <ul>{oneFile.name}</ul>   
                                    </div>
                                </div>
                                </>
                            )}
                            </> 
                        ))}                                     
                    </div>}
                </div>
                }
              {caroselNewView&&
                <div className='caroselInputArea'>
                    <input type='text' placeholder="카로셀 추가" ref={inputRef} onKeyPress={onSubmitAddCarosel}/>
                    <button className="deleteBtn" onClick={()=>{setCaroselNewView(!caroselNewView)}}>취소</button>
                    <button className="addBtn" onClick={addCaroselGroupApi}>추가</button>
                </div>
                }  
              
            </div>
        </div>
        <div className='footer'> 
                    <button onClick={saveFile}>파일 저장 </button>
        </div> 
       
    </div>
    );
};
export default UploadFile;