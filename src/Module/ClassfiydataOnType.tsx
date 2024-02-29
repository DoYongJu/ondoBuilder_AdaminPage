import {useState, useEffect} from 'react';
import ConnectApi from '../Module/ConnectApi';
import {dataByTypeList} from '../Resources/Models';
import { DataHub_sortIntheHub_module}from '../Module/Search_module';
import InfiniteScroll from 'react-infinite-scroll-component';

const ClassfiydataOnType =({ classfiyType, hubId, viewType, onClick, selected, selectedF}: 
    { classfiyType: string, hubId: string, viewType: string, onClick: () => void, selected?:string, selectedF?:(item:File | null)=>void }) =>{
    // console.log(selected);
    // console.log(classfiyType);
    const [imageSrc, setImageSrc] = useState('');
    const [list, setList] = useState<dataByTypeList | null>(null);
    const [delicatedlist, setDelicatedlist] = useState<dataByTypeList | null>(null);

    useEffect(() => {
        //데이터 허브의 종속된 파일을 타입별로 조회
        function selectDataByTypeApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/${hubId}?type=${classfiyType}`})
                .then((res) => {
                    setList(res.data);
                    console.log(res.data);
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
    
    }, [classfiyType, selectedF]);

    useEffect(() => {
       function getContentBySelect(){
        console.log("selected"+selected);
        const datass = selected ? DataHub_sortIntheHub_module({ data: list ?? undefined }, selected) : undefined;
          if(datass){
            setList(datass);
          };
         
       };
       getContentBySelect();
    
    }, [selected]);


    if (viewType === 'true') {
        if(classfiyType === 'url'){
            return (
                <>{list?.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={onClick} > 
                        <ul>
                            <img style={{width:'62px', height:'86px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                        </ul>
                        <ul><li>{item.url_description}</li></ul>
                        <ul>
                            <li>업로드일</li>
                            <li>{item.url_regdate}</li>
                        </ul>
                    </div>
                ))}
                </>
            );
        }else{
            return (
                <>{}{list?.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={onClick} >
                        <ul>
                            <img style={{width:'62px', height:'86px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                        </ul>
                        <ul><li>{item.file_name}</li></ul>
                        <ul>
                            <li>업로드일</li>
                            <li>{item.file_regdate}</li>
                        </ul>
                        {/* <ul>
                            <li>수정일</li>
                            <li>{item.file_upddate}</li>
                        </ul> */}
                 
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
                  {/* <InfiniteScroll
      dataLength={list.length}
      next={list}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item, index) => (
        <div key={index}>Item {index}</div>
      ))}
    </InfiniteScroll> */}

                {list?.map((item, index) => (
                    <div className='list' key={index} onClick={onClick}>
                    <ul>
                        <li> 
                            <img style={{width:'36px', height:'36px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                            {item.file_name}
                        </li>
                        <li>{item.file_description}</li>
                        <li>{item.writer}</li>
                        <li>{item.file_regdate}</li>
                        {item.file_upddate ? <li>{item.file_upddate}</li> : <li>&nbsp;</li>}
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