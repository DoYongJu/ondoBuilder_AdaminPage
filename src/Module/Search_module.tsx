import React from 'react';
import { MyObjects, MyObject } from '../Resources/Models';

//검색 모듈
function DataHub_module({data}:{data:MyObjects}, searchText:string) {
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
};

export function DataHub_listOfType_module({data}:{data:MyObjects}, orderByType:string){
  let resultList: MyObjects = [...data];

    switch (orderByType) {
      case '이름순':
        resultList.sort((a, b) => a.hub_name.localeCompare(b.hub_name, 'ko-KR', { sensitivity: 'base' }));
        break;
      case '주제순':
        resultList.sort((a, b) => a.hub_description.localeCompare(b.hub_description, 'ko-KR', { sensitivity: 'base' }));
        break;
      case '생성일순':
        resultList.sort((a, b) => new Date(a.datahub_regdate).getTime() - new Date(b.datahub_regdate).getTime());
        break;
      case '수정일순':
        resultList.sort((a, b) => {
          let aDate = a.datahub_upddate ? new Date(a.datahub_upddate).getTime() : new Date(a.datahub_regdate).getTime();
          let bDate = b.datahub_upddate ? new Date(b.datahub_upddate).getTime() : new Date(b.datahub_regdate).getTime();
          return aDate - bDate;
        });
        break;
      default:
        return resultList;
    };

  return resultList;

};

export default DataHub_module;