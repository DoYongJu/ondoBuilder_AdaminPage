import SelectBox from '../SelectBox/SelectBox';
import Cookies from 'js-cookie';
import { RefObject, useState,useEffect } from 'react';
import {imgInfoForCarselList} from '../../Resources/Models';
import axios from 'axios';
interface ImageInfo {
    id: number;
    name: string;
    file_url: string;
    order: number;
  }
const UploadedFileCarosel=({caroselNewView,selected,handleSelect,selectList,setCaroselNewView, images, handleDragStart, handleDrop, imgClicked, inputRef,
    onSubmitAddCarosel, addCaroselGroupApi}:
    {caroselNewView:boolean, selected:boolean|string, handleSelect:(e:any) => void, selectList:any[], setCaroselNewView:(caroselNewView: boolean)=>void,
    images?:imgInfoForCarselList, handleDragStart:(e:any, index:number)=>void, handleDrop:(e:any, index:number)=>void,imgClicked:()=>void,
    inputRef:RefObject<HTMLInputElement>, onSubmitAddCarosel:(event:any) => void, addCaroselGroupApi:()=>void})=>{
    // const [previewimages, setPreviewimages] = useState<imgInfoForCarselList>([]);
    const token = Cookies.get('accessToken');
    console.log(images);
    // useEffect(() => {

    //     function getFileInfo(){ //미리보기파일 포함 시키기

    //             if (oneFile) {
    //                 const reader = new FileReader();
                    
    //                 reader.onloadend = () => {
    //                     const updatedImages = [...images]; // 이미지 배열 복사
    //                     updatedImages[0] = { // 기존 이미지를 덮어씌움
    //                         image_no: 0,
    //                         file_name: oneFile.name,
    //                         file_url: reader.result as string,
    //                         turn: 0
    //                     };
    //                     setImages(updatedImages); // 이미지 상태 업데이트
    //                 };
    //                 reader.readAsDataURL(oneFile);
    //             }
    //     };

    //     getFileInfo();  //파일 미리보기 기능
      
    // }, []);




    // const [previewImages, setPreviewImages] = useState<imgInfoForCarselList>([]);

    // useEffect(() => {
    //   const fetchPreviewImages = async () => {
    //     try {
    //         const imagesWithUrls = await Promise.all(images?.map(async (img) => {
    //             const imageUrl = img ? await createImg(img.file_url) : ''; 
    //             return { ...img, imageUrl };
    //         }) ?? []);
    //         setPreviewImages(imagesWithUrls);
    //         console.log("imagesWithUrls: "+ imagesWithUrls[0].imageUrl);
    //       } catch (error) {
    //         console.error('Error fetching images:', error);
    //       }
    //   };
  
    //   fetchPreviewImages();
    // }, [images]);
  
    // async function createImg(url:string) {
    //   try {
    //     const response = await axios.get(url, {
    //       responseType: 'blob',
    //       headers: {
    //         Authorization :`Bearer ${token}` ,
    //       },
    //     });
    //     console.log("window.URL.createObjectURL(response.data): "+ window.URL.createObjectURL(response.data));
    //     return window.URL.createObjectURL(response.data);
    //   } catch (error) {
    //     console.error('Error creating image:', error);
    //     return ''; // 에러가 발생하면 빈 문자열 반환
    //   }
    // }
    return(
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
              {(selected && selected!='선택하지 않음')&&
              <div className='moveCaroselArea'>
                  {images?.map((img, index) => (
                     
                      <div className='img' key={index} draggable onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e)=>{ e.preventDefault()}} onDrop={(e) => handleDrop(e, index)}
                          onClick={imgClicked}>
                          
                               <div className='imgArea' >
                              <img style={{width:'102px', height:'102px' }} src={img.imageUrl} alt="File Preview"/> 
                               <div className="image-number">{(img.turn)}</div>
                               <ul >{img.file_name}</ul>
                           </div>
                           
                      </div>
          
                  ))}                                     
              </div>}
          </div>
          }
        {caroselNewView&&
          <div className='caroselInputArea'>
              <input type='text' placeholder="카로셀 추가" onChange={(e)=>onSubmitAddCarosel(e)}/>
              <button className="deleteBtn" onClick={()=>{setCaroselNewView(!caroselNewView)}}>취소</button>
              <button className="addBtn" onClick={addCaroselGroupApi}>추가</button>
          </div>
          }  
        
      </div>
    );
};
export default UploadedFileCarosel;