import ConnectApi from './ConnectApi';
import {tagsList} from '../Resources/Models';

const UploadFileDataHandler=({ classfiyType, hubId,file_description, file_tag, carousel_id, turn, doc,url_tag,url_description,prompt, urlInfo}: 
    { classfiyType: string, hubId: number, file_description?:string, file_tag?: string[],carousel_id?:number, turn?:number,
        url_tag?: string[], url_description?: string, doc?:File, prompt?:string, urlInfo?:string})=>{
    
    let apiUrl = '';
    let sendParam:any = {};

    switch(classfiyType) {
        case 'img':
            apiUrl = `/v1/api/datahub/img`;
            sendParam = {hub_id: hubId, file_tag: file_tag, file_description: file_description, carousel_id:carousel_id, turn:turn}
            break;
        case 'video':
            apiUrl = `/v1/api/datahub/video`;
            sendParam = { hub_id: hubId, file_tag: file_tag, file_description: file_description };
            break;
        case 'doc':
            apiUrl = `/v1/api/datahub/doc`; 
            sendParam = { hub_id: hubId, file_description: file_description, doc:doc, prompt:prompt};
            break;
        default: //case 'url': 
            apiUrl = `/v1/api/datahub/urlUpload`;
            sendParam = { hub_id: hubId, url_tag: url_tag, url_description: url_description, urlInfo: urlInfo, doc:doc}; 
            //02.23urlInfo 은 기획에는 있지만 태호씨 api에는 없음->태호씨 휴가->추후 확인 필요
            break;
    };
    
    ConnectApi({ method: 'POST', url: apiUrl, sendParam:sendParam, formData:true})
        .then((res) => {
            console.log('/UploadFileDataHandler/'+res);
        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
                           

};



export default UploadFileDataHandler; 