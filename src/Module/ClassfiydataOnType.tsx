import {useState, useEffect} from 'react';
import ConnectApi from '../Module/ConnectApi';
import {dataByTypeList} from '../Resources/Models';

const ClassfiydataOnType =({ classfiyType, hubId, viewType, onClick }: { classfiyType: string, hubId: string, viewType: string, onClick: () => void  }) =>{
    console.log(hubId);
    console.log(classfiyType);
    const [imageSrc, setImageSrc] = useState('');
    const [list, setList] = useState<dataByTypeList | null>(null);
    const [delicatedlist, setDelicatedlist] = useState<dataByTypeList | null>(null);
    // useEffect(() => {
    //     console.log('chasssnged: ', delicatedlist);
    //   }, [delicatedlist]);
    useEffect(() => {
        //데이터 허브의 종속된 파일을 타입별로 조회
        function selectDataByTypeApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/${hubId}?type=${classfiyType}`})
                .then((res) => {
                    console.log(res.data);
                    setList(res.data);
                    // if (list !== null && list.length > 0) {
                    //     const nameAndType = res.data.hub_name.split('.');
                    //     const updatedList: dataByTypeList = [
                    //       {
                    //         ...list[0], 
                    //         file_name: nameAndType[0], 
                    //         file_name_type: nameAndType[1] 
                    //       },
                    //       ...list.slice(1) 
                    //     ];
                    //     setDelicatedlist(updatedList);
                    //   }
                    //   console.log('chaged: '+delicatedlist);
                    switch (classfiyType) {
                        case 'doc':
                            setImageSrc('/doc.svg');
                            break;
                        case 'img':
                            setImageSrc('/img.svg');
                            break;
                        case 'video':
                            setImageSrc('/video.svg');
                            break;
                        case 'url':
                            setImageSrc('/link.svg');
                            break;
                        default:
                            setImageSrc(''); 
                            break;
                    };
        
                      

                })
                .catch((error) => {
                    console.error('Error occurred:', error);
                });
        };
    
        selectDataByTypeApi();
    
    }, [classfiyType]);


    if (viewType === 'true') {
        if(classfiyType === 'url'){
            return (
                <>{}{list?.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={onClick} > {item.file_description}
                    <img style={{width:'212px', height:'164px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                    </div>
                ))}
                </>
            );
        }else{
            return (
                <>{}{list?.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={onClick} > {item.file_description}
                    <img style={{width:'212px', height:'164px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                    </div>
                ))}
                </>
            );
        };

    } else {
        if(classfiyType === 'url'){
            return (
                <>
                {}{list?.map((item, index) => (
                    <div className='list' key={index} onClick={onClick}>
                    <ul>
                        <li> 
                            <img style={{width:'36px', height:'36px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                            {item.url_link}
                        </li>
                        <li>{item.url_description}</li>
                        <li>{item.writer}</li>
                        <li>{item.url_regdate}</li>
                        {item.url_upddate ? <li>{item.url_upddate}</li> : <li>&nbsp;</li>}
                        <li> -- </li>
                    </ul>
                  </div>
                ))}
                </>
            );
        }else{
            return (
                <>
                {}{list?.map((item, index) => (
                    <div className='list' key={index} onClick={onClick}>
                    <ul>
                        <li> 
                            <img style={{width:'36px', height:'36px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                            {item.file_name}
                        </li>
                        <li>{item.file_description}</li>
                        <li>{item.writer}</li>
                        <li>{item.file_regdate}</li>
                        <li>{item.file_upddate}</li>
                        <li>{item.file_size}</li>
                    </ul>
                  </div>
                ))}
                </>
            );
        };

    };//first if end
};
export default ClassfiydataOnType;