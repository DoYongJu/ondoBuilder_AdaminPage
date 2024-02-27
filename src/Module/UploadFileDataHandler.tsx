import ConnectApi from './ConnectApi';
import { tagsList } from '../Resources/Models';

const UploadFileDataHandler = async ({
    classfiyType, hubId, file_description, file_tag, carousel_id, turn, doc, url_tag, url_description, prompt, urlInfo
}: {
    classfiyType: string, hubId: number, file_description?: string, file_tag?: string[], carousel_id?: number, turn?: number,
    url_tag?: string[], url_description?: string, doc?: File, prompt?: string, urlInfo?: string
}): Promise<boolean> => { // 비동기 함수 선언과 반환 타입 명시

    let apiUrl = '';
    let sendParam: any = {};

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
        default:
            apiUrl = `/v1/api/datahub/urlUpload`;
            sendParam = { hub_id: hubId, url_tag: url_tag, url_description: url_description, urlInfo: urlInfo, doc:doc};
            break;
    };

    try {
        await ConnectApi({ method: 'POST', url: apiUrl, sendParam: sendParam, formData: true });
        console.log('/UploadFileDataHandler/ success');
        return true;
    } catch (error) {
        console.error('Error occurred:', error);
        return false;
    }
};

export default UploadFileDataHandler;
