import ConnectApi from './ConnectApi';

const UploadFileDataHandler = async ({
    classfiyType, hubId, file_description, file_tag, carousel_id, turn, content, url_tag, url_description, prompt, urlInfo
}: {
    classfiyType: string, hubId: number, file_description?: string, file_tag?: string[], carousel_id?: number, turn?: number,
    url_tag?: string[], url_description?: string, content?: File, prompt?: string, urlInfo?: string
}): Promise<boolean> => { // 비동기 함수 선언과 반환 타입 명시

    let apiUrl = '';
    let sendParam: any = {};
    let formData = new FormData();



    switch(classfiyType) {
        case 'img':
            apiUrl = `/v1/api/datahub/img`;

            if(carousel_id === -2){
                sendParam = {hub_id: hubId, 
                            file_tag: file_tag, 
                            file_description: file_description,
                            img:content
                             }
            }else{
                sendParam = {hub_id: hubId, 
                            file_tag: file_tag, 
                            file_description: file_description, 
                            carousel_id:carousel_id, 
                            turn:turn,
                            img:content
                            }
            };
            break;
        case 'video':
            apiUrl = `/v1/api/datahub/video`;
            sendParam = { hub_id: hubId, 
                        file_tag: file_tag, 
                        file_description: file_description,
                        video:content};
            break;
        case 'doc':
            apiUrl = `/v1/api/datahub/doc`;

            sendParam = {
                        hub_id: hubId,
                        file_description: file_description, 
                        doc:content, prompt:prompt};
            break;
              
        default:
            apiUrl = `/v1/api/datahub/urlUpload`;
            sendParam = { hub_id: hubId, 
                        url_tag: file_tag, 
                        url_description: urlInfo};
            break;
    };

    try {
        if(classfiyType === 'link'){
            await ConnectApi({ method: 'POST', url: apiUrl, sendParam: sendParam, formData: false });
            return true;
        }else{
            await ConnectApi({ method: 'POST', url: apiUrl, sendParam: sendParam, formData: true });
            return true;
        }
        
    } catch (error) {
        return false;
    }
};

export default UploadFileDataHandler;
