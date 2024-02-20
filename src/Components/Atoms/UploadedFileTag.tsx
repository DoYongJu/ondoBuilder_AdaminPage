import {tagsList, tag, UploadFileProps, selCaroselGroupList} from '../../Resources/Models';
import { RefObject, KeyboardEvent } from 'react';
import { BiX } from "react-icons/bi";
const UploadedFileTag=({inputRef, onSubmitSearch, tags, deleteTag}:{inputRef:RefObject<HTMLInputElement>,tags:tagsList, 
    onSubmitSearch:(event: KeyboardEvent<HTMLInputElement>) => void, deleteTag:(index: number) => void;})=>{

    return(
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
    );
}; 
export default UploadedFileTag;