import {useState, useEffect} from 'react';
import ConnectApi from '../Module/ConnectApi';
import {dataByTypeList, dataByType} from '../Resources/Models';
import {  useSetRecoilState, useRecoilValue} from 'recoil';
import {  dataByDocState, dataByVideoState,dataByUrlState,dataByImgState, ActiveHubFileListState, syncSearchTextState } from '../Resources/Recoil';
import {DataHub_searchWordIntheHub_module}from '../Module/Search_module';


const ClassfiydataOnType =({ classfiyType, hubId, viewType, onClick, selected, selectedF}: 
    { classfiyType: string, hubId: string, viewType: string, onClick: () => void, selected?:string, selectedF?:(item:File | null)=>void }) =>{

    const [imageSrc, setImageSrc] = useState('');
    const [originlist, setOriginList] = useState<dataByTypeList>([]);
    const searchText = useRecoilValue(syncSearchTextState);
    const [listByselc, setListBySelc] = useState<dataByTypeList>(originlist),
  


    //file recoil
    setDocInfoRecoil = useSetRecoilState(dataByDocState),
    setUrlInfoRecoil = useSetRecoilState(dataByUrlState),
    setImageInfoRecoil = useSetRecoilState(dataByImgState),
    setVideoInfoRecoil = useSetRecoilState(dataByVideoState);
    //랜더링
    const relanderingActiveHub = useRecoilValue(ActiveHubFileListState);
    

    useEffect(() => {
        //데이터 허브의 종속된 파일을 타입별로 조회
        function selectDataByTypeApi() {
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/${hubId}?type=${classfiyType}`})
                .then((res) => {
                    setOriginList(res.data);
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
                  console.log("at firstApi");
                   console.log(originlist);
                   console.log(listByselc);
        };
        selectDataByTypeApi();
    
    }, [classfiyType, relanderingActiveHub]); //selectedF가 있었으나 뺌. 파일이 업로드 된후, 업로드한 파일이 포함된 케이스 고려때문에 잇엇지만, 정렬기능 만들며 충돌

    useEffect(() => {
        setListBySelc(originlist);
    }, [originlist]);
    
    useEffect(() => {
       
    }, [listByselc]);

    useEffect(() => {
        console.log("aaaaaaaar검색기능 useRffect aaaaaaaaaaaaaa");
        console.log(searchText);
        function getContentBySelect() {
            let datass = DataHub_searchWordIntheHub_module({ data: originlist },searchText, selected );
        //    if(datass.length === 0){
        //     alert('원하시는 검색 결과가 없습니다.')
        //    }
            setListBySelc(datass);
            console.log("모듈이후 데이터") 
            console.log(datass);
            // setSearchState('');
        };
        
        getContentBySelect();
    }, [selected, searchText]);

    function handleClick (item:dataByType){
        console.log(item);
        switch(classfiyType){
            case 'doc':
                setDocInfoRecoil({hub_id:Number(hubId), 
                    doc_no:item.doc_no, 
                    file_name:item.file_name,
                    file_description:item.file_description,
                    file_regdate:item.file_regdate,
                    file_upddate:item.file_upddate,
                    file_size:item.file_size,
                    file_prompt:item.file_prompt,
                    download_url:item.download_url,
                    writer:item.writer})
                break;
            case 'img':
                setImageInfoRecoil({hub_id:Number(hubId), 
                    image_no:item.image_no, 
                    file_name:item.file_name,
                    file_description:item.file_description,
                    file_regdate:item.file_regdate,
                    file_upddate:item.file_upddate,
                    file_size:item.file_size,
                    file_tag:item.file_tag,
                    download_url:item.download_url,
                    writer:item.writer,
                    turn: item.turn,
                    casosel_name:item.carousel_name,
                    carosel_id:item.carousel_id, 
                    })
                break;
            case 'video':
                setVideoInfoRecoil({hub_id:Number(hubId), 
                    video_no:item.video_no, 
                    file_name:item.file_name,
                    file_description:item.file_description,
                    file_regdate:item.file_regdate,
                    file_upddate:item.file_upddate,
                    file_size:item.file_size,
                    file_tag:item.file_tag,
                    download_url:item.download_url,
                    writer:item.writer})
                break;
            case 'url':
                setUrlInfoRecoil({hub_id:Number(hubId), 
                    url_no:item.url_no, 
                    url_description:item.url_description,
                    url_regdate:item.url_regdate,
                    url_upddate:item.url_upddate,
                    writer:item.writer, url_tag:item.url_tag, url_name:item.url_name})
                break;
            default:
                break;
        }
       
        onClick();
    };

    if (viewType === 'true') {
        if(classfiyType === 'url'){
            return (
                <>{listByselc.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={()=>handleClick(item)} > 
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
                <>{listByselc.map((item, index) => (
                    <div className='theActiveHub' key={index} onClick={()=>handleClick(item)} >
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
                {}{listByselc.map((item, index) => (
                    <div className='list' key={index} onClick={()=>handleClick(item)}>
                    <ul>
                        <li> 
                            <img style={{width:'36px', height:'36px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                            {item.url_link}
                        </li>
                        <li><span>{item.url_description}</span></li>
                        <li><span>{item.writer}</span></li>
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
                {listByselc.map((item, index) => (
                    <div className='list' key={index} onClick={()=>handleClick(item)}>
                    <ul>
                        <li> 
                            <img style={{width:'36px', height:'36px' }} src={process.env.PUBLIC_URL +imageSrc}/>
                            {item.file_name}
                        </li>
                        <li><span>{item.file_description}</span></li>
                        <li><span>{item.writer}</span></li>
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