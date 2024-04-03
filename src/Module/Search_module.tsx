import { MyObjects, dataByTypeList, dataByType } from '../Resources/Models';



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
    };

    if (searchText === "") {
      return data;
    };
    
  }

  return resultList;
};

// function getPriority(char:string) {
//   // 우선순위: 숫자 > 영어 > 영어 외의 언어 > 특수문자
//   if (/[0-9]/.test(char)) return 1;
//   if (/[a-zA-Z]/.test(char)) return 2;
//   if (/[ㄱ-ㅎ가-힣]/.test(char)) return 3;
//   return 4; // 특수문자
// };
//doc타입 분류
export function filterDocsByType_module({data}:{ data: dataByTypeList }, filterDocType:string[] |undefined){

  let isSearchTextlist: dataByTypeList = []; 
 
  filterDocType?.forEach((doc: string) => {
    // 필터링 조건에 맞는지 확인하여 filteredDocs에 추가
    // 예를 들어, 문서의 유형이 filterOptions에 포함되는지 확인하여 추가할 수 있음
    data?.forEach((item: dataByType) => {
      if (item.docType.includes(doc.toLowerCase())) {
        isSearchTextlist.push(item);
      }
    });
   
  });
    return isSearchTextlist; 
};

//url검색기능
export function DataHub_searchWordIntheHub_url_module({data}:{ data: dataByTypeList }, searchText:string, classify?:string){

  let isSearchTextlist: dataByTypeList = []; 
  if(searchText !== 'default'){ //검색어가 있는 경우
    searchText = searchText.toLowerCase();
    for (let i = 0; i < data.length; i++) {
      var nowData = data[i];
  
      if ((nowData.url_upddate && nowData.url_upddate.match(searchText)) ||
          (!nowData.url_upddate && searchText === "") ||
          nowData.url_name.match(searchText) || 
          nowData.url_regdate.match(searchText)) {
  
          isSearchTextlist.push(nowData);
          if(classify){ //검색어도 있고 분류체크도 있는경우
            isSearchTextlist = DataHub_sortIntheHub_url_module({data:isSearchTextlist},classify );
          }
      };
    };
    return isSearchTextlist;

  }else{//검색어가 없는 경우->전체 데이터 반환.
    isSearchTextlist = DataHub_sortIntheHub_url_module({data:data},classify);
    return isSearchTextlist;
  };

};
//1개의 허브 안에서 url select값에 따라 정렬
 function DataHub_sortIntheHub_url_module({data}:{ data: dataByTypeList }, classify?:string){
  if(data){
    let resultList: dataByTypeList = [...data]; 

    switch (classify) {
      case '이름순':
        resultList.sort((a,b) => {
          if(a.url_name > b.url_name ) return 1;
          if(a.url_name < b.url_name) return -1;
          return 0;
        });
        break;
      case '수정일순':
        resultList.sort((a, b) => {
          let aDate = a.url_upddate ? new Date(a.url_upddate).getTime() : new Date().getTime();
          let bDate = b.url_upddate ? new Date(b.url_upddate).getTime() : new Date().getTime();
          return aDate - bDate;
        });
        break;
      case '업로드순':
        resultList.sort((a, b) => {
          let aDate = a.url_regdate ? new Date(a.url_regdate).getTime() : new Date().getTime();
          let bDate = b.url_regdate ? new Date(b.url_regdate).getTime() : new Date().getTime();
          return aDate - bDate;
        });
        break;
      default:
        break;
    };

    return resultList; 
    
  }else{
    return [];
  };
};

//문서, 이미지, 동영상에 대한 단어 검색.
export function DataHub_searchWordIntheHub_module({data}:{ data: dataByTypeList }, searchText:string, classify?:string){

  let isSearchTextlist: dataByTypeList = []; 
  if(searchText !== 'default'){ //검색어가 있는 경우
    searchText = searchText.toLowerCase();
    for (let i = 0; i < data.length; i++) {
      var nowData = data[i];
  
      if ((nowData.file_upddate && nowData.file_upddate.match(searchText)) ||
          (!nowData.file_upddate && searchText === "") ||
          nowData.file_name.match(searchText) || 
          nowData.file_regdate.match(searchText)) {
  
          isSearchTextlist.push(nowData);
          if(classify){ //검색어도 있고 분류도 있는경우
            isSearchTextlist = DataHub_sortIntheHub_module({data:isSearchTextlist},classify );
          }
      }
    };
    // setSearchState('default');
    return isSearchTextlist;
  }else{//검색어가 없는 경우.
    isSearchTextlist = DataHub_sortIntheHub_module({data:data},classify);
    // setSearchState('');
    return isSearchTextlist;
  }

};
//1개의 허브 안에서 select값에 따라 파일 정렬
function DataHub_sortIntheHub_module({data}:{ data: dataByTypeList }, classify?:string){
  if(data){
    console.log("DataHub_sortIntheHub_module start!!!");
    console.log(classify);

    let resultList: dataByTypeList = [...data]; 
    switch (classify) {
      case '이름순':
        resultList.sort((a,b) => {
          if(a.file_name > b.file_name ) return 1;
          if(a.file_name < b.file_name) return -1;
          return 0;
        });
        break;
      case '수정일순':
        resultList.sort((a, b) => {
          let aDate = a.file_upddate ? new Date(a.file_upddate).getTime() : new Date().getTime();
          let bDate = b.file_upddate ? new Date(b.file_upddate).getTime() : new Date().getTime();
          return aDate - bDate;
        });
        break;
      case '업로드순':
        resultList.sort((a, b) => {
          let aDate = a.file_regdate ? new Date(a.file_regdate).getTime() : new Date().getTime();
          let bDate = b.file_regdate ? new Date(b.file_regdate).getTime() : new Date().getTime();
          return aDate - bDate;
        });
        break;
      default:
        break;
    };
    // console.log("resultList");
    // console.log(resultList);
    return resultList; 
  }else{
    return [];
  }
 
};
//대쉬보드 정렬
export function DataHub_listOfType_module({data}:{data:MyObjects}, orderByType:string){
  let resultList: MyObjects = [...data];
  console.log(resultList);
    switch (orderByType) {
      case '이름순':
        resultList.sort((a,b) => {
          if(a.hub_name > b.hub_name ) return 1;
          if(a.hub_name < b.hub_name) return -1;
          return 0;
        });
        break;
      case '주제순':
        resultList.sort((a,b) => {
          if(a.hub_description > b.hub_description ) return 1;
          if(a.hub_description < b.hub_description) return -1;
          return 0;
        });
        

      //   resultList.sort((a, b) => {
      //     const minLength = Math.min(a.hub_description.length, b.hub_description.length);
      //     for (let i = 0; i < minLength; i++) {
      //         const charA = a.hub_description[i];
      //         const charB = b.hub_description[i];
      //         const priorityA = getPriority(charA);
      //         const priorityB = getPriority(charB);
              
      //         if (priorityA !== priorityB) {
      //             return priorityA - priorityB;
      //         } else if (charA !== charB) {
      //             // 우선순위가 같은 경우에는 localeCompare 사용
      //             return charA.localeCompare(charB);
      //         };
      //     }
      //     // 문자열 길이가 다른 경우에는 짧은 문자열이 먼저 오도록 정렬
      //     return a.hub_description.length - b.hub_description.length;
      // }
      // );
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