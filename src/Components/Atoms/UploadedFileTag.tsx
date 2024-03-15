import {tagsList} from '../../Resources/Models';
import { RefObject, KeyboardEvent, useEffect, useState } from 'react';
import { BiX } from "react-icons/bi";
const UploadedFileTag=({inputRef, onSubmitSearch, tags, deleteTag, originTags}:{inputRef:RefObject<HTMLInputElement>,tags:tagsList, originTags?:string,
    onSubmitSearch:(event: KeyboardEvent<HTMLInputElement>) => void, deleteTag:(index: number) => void;})=>{
    
    const [originTagList, setOriginTagList] = useState<String[]>();
    
    useEffect(()=>{
        function parseStringToCarouselArray(originTags:string) {
            try {
                // 문자열에서 불필요한 문자(따옴표 및 중괄호)를 제거
                const cleanedStr = originTags.replace(/[{}"]/g, '');
        
                // 쉼표를 기준으로 문자열을 나누어 배열로 변환
                const resultArray = cleanedStr.split(',');
        
                return resultArray;
            } catch (error) {
                console.error("Error parsing string:", error);
                return [];
            }
        }
        if(originTags){
            setOriginTagList(parseStringToCarouselArray(originTags));
        }
       
    },[]);
    
    return(
        <div className='FileTag'>
            <div className='FileTagtitle'><ul>태그</ul></div>
            <div className='FileTagbody'>
            <div><input type="text"  placeholder="엔터로 태그를 등록해주세요." ref={inputRef} onKeyPress={onSubmitSearch} /></div>
            <div className='tagListArea'>
                {originTagList?.map((option, index) => (
                            <div key={index} className='theItem'>
                                <ul>
                                    <li>{option}</li>
                                    <li><span onClick={()=>deleteTag(index)}><BiX size={18}/></span></li>
                                </ul>
                            </div>
                        ))}
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
    );
}; 
export default UploadedFileTag;