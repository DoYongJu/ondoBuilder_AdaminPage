import React from 'react';
import { MyObject, contentList } from '../Resources/Models';

 /*
대쉬보드에 있는 데이터 허브를 만들기 위한 템플릿.
*/ 
/*  dataHandler
*  : DB 에서 가져온 순수 data 를 바인딩하기 편한 형태로 가공하는 핸들러
*/
const dataHandler=(content : MyObject)=>{

  let content_inner_list = Object.keys(content);
  let contents:contentList = [];
  
  contents.push({
    "name": "none",
    "val": (Number(content.doc_count) === 0 && Number(content.image_count) === 0 &&  
            Number(content.video_count)  === 0 && Number(content.url_count) === 0) ? 1 : 0

  });


  content_inner_list.map((item) => {
   
    switch(item){
      case "doc_count" : contents.push({"name" : "문서", "val" :  Number(content.doc_count)}); break;
      case "image_count" : contents.push({"name" : "이미지", "val" : Number(content.image_count) }); break;
      case "video_count" : contents.push({"name" : "비디오", "val" : Number(content.video_count) }); break;
      case "url_count" : contents.push({"name" : "링크", "val" : Number(content.url_count) }); break;
      default : break;
    }
    
  });
  
  /*  contents 를 바인딩 하기 편한 형식으로 가공합니다.
  *   만약 파일 종류가 늘어 날 경우 case 에서 형식을 늘려주시면 됩니다.
      contents = [{"name" : "문서", "val" :  0}, ......]
  */
  return contents;
};


export default dataHandler;