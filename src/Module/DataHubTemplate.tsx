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
    "val": (content.doc === 0 && content.img === 0 && content.text === 0 && content.link === 0) ? 1 : 0
  });


  content_inner_list.map((item) => {
   
    switch(item){
      case "doc" : contents.push({"name" : "문서", "val" :  content.doc}); break;
      case "img" : contents.push({"name" : "이미지", "val" : content.img }); break;
      case "text" : contents.push({"name" : "비디오", "val" : content.text }); break;
      case "link" : contents.push({"name" : "링크", "val" : content.link }); break;
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