import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function ConnectApi({ method, url, sendParam,formData }: { method: HttpMethod, url: string, sendParam?: any , formData?: boolean}): Promise<AxiosResponse> {
    const token = Cookies.get('accessToken');
    const config: AxiosRequestConfig = {
        method: method,
        url: process.env.REACT_APP_API + url,
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Accept-Charset': 'utf-8'
              
                },
        data: sendParam
        };

        if (token) {
            config.headers = config.headers ?? {};
            config.headers['Authorization'] = `Bearer ${token}`;
        };
        if(formData===true){
            config.headers = config.headers ?? {};
            config.headers['Content-Type'] = `multipart/form-data`;
        }

        try {
            const response = await axios(config);
            // console.log('response:', response);



            return response;
           
        } catch (error) {
            console.log('error:', error);
            throw error;
        };  
        
};

export default ConnectApi;
