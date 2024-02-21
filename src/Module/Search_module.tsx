import React from 'react';
import { MyObjects } from '../Resources/Models';

//검색 모듈
function module(data: MyObjects, searchText: string) {
  searchText = searchText.toLowerCase();
  let resultList: MyObjects = [];

  for (let i = 0; i < data.length; i++) {
    var nowData = data[i];

    if ((nowData.datahub_upddate && nowData.datahub_upddate.match(searchText)) ||
        (!nowData.datahub_upddate && searchText === "") ||
        nowData.hub_description.match(searchText) || 
        nowData.hub_name.match(searchText) ||
        nowData.datahub_regdate.match(searchText)) {
      
      resultList.push(nowData);
    }
  }

  return resultList;
}


//타입별 검색 모듈 -> 기능 삭제되나 백업용으로 존재
// function module(dummyData: MyObjects, searchType:string, searchText:string, doSearch:boolean){
//   let filteredData = dummyData;
//   searchText = searchText.toLowerCase();
  
//   if( doSearch === true ){
//    switch(searchType){
//       case "이름별" : filteredData = dummyData.filter((item) => (item.name.toLowerCase().includes(searchText))); break;
//       case "주제별" : filteredData =  dummyData.filter((item) => (item.title.toLowerCase().includes(searchText))); break;
//       case "생성일" : filteredData = dummyData.filter((item) => (item.generateDate.toLowerCase().includes(searchText))); break;
//       default : filteredData = dummyData.filter((item) => (item.lastEditDate.toLowerCase().includes(searchText))); break;
//     };
//   };
//  return filteredData;
// };

const DataHub_module = ({data}:{data:MyObjects}, searchText:string)=>{
// ({ dummyData }: { dummyData: MyObjects })는 해당 함수의 파라미터로 객체를 받고, 이 객체는 dummyData라는 속성을 가지며 그 타입은 MyObjects입니다. 이 부분은 TypeScript의 비구조화 할당(destructuring)을 사용한 것
  return module(data, searchText);
};


export default DataHub_module;