import SelectBox from '../SelectBox/SelectBox';
import { RefObject, KeyboardEvent } from 'react';

const UploadedFileCarosel=({caroselNewView,selected,handleSelect,selectList,setCaroselNewView, images, handleDragStart, handleDrop, imgClicked, inputRef,
    onSubmitAddCarosel, addCaroselGroupApi}:
    {caroselNewView:boolean, selected:boolean|string, handleSelect:(e:any) => void, selectList:any[], setCaroselNewView:(caroselNewView: boolean)=>void,
    images:any[], handleDragStart:(e:any, index:number)=>void, handleDrop:(e:any, index:number)=>void,imgClicked:()=>void,
    inputRef:RefObject<HTMLInputElement>, onSubmitAddCarosel:(event:any) => void, addCaroselGroupApi:()=>void})=>{
      
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
              {(selected&& selected!='선택하지 않음')&&
              <div className='moveCaroselArea'>
                  {images.map((img, index) => (
                      
                      <div className='img' key={index} draggable onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e)=>{ e.preventDefault()}} onDrop={(e) => handleDrop(e, index)}
                          onClick={imgClicked}>
                          <div className='imgArea' >
                              <img style={{width:'102px', height:'102px' }} src={process.env.PUBLIC_URL +img.src}/>
                              <div className="image-number">{img.order}</div>
                              <ul >{img.name}</ul>
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