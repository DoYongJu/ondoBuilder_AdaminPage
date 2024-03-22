import {useState, useEffect} from 'react';
import ConnectApi from '../Module/ConnectApi';
import {dataByTypeList, dataByType} from '../Resources/Models';
import {  useSetRecoilState, useRecoilValue} from 'recoil';
import {  dataByDocState, dataByVideoState,dataByUrlState,dataByImgState, syncSearchTextState, ActiveHubFileListDetailsState } from '../Resources/Recoil';
import {DataHub_searchWordIntheHub_module, DataHub_searchWordIntheHub_url_module, filterDocsByType_module}from '../Module/Search_module';


const ClassfiydataOnType =({ classfiyType, hubId, viewType, onClick, selected, IsRelandering, filterDocType}: 
    { classfiyType: string,IsRelandering:boolean,  hubId: string, viewType: string,onClick: () => void, selected?:string,  filterDocType?:string[]}) =>{

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
    const relanderingActiveHubFileList = useRecoilValue(ActiveHubFileListDetailsState);
    function selectDataByTypeApi() {
            console.log("classfiydataOntype 컴포넌트의 selectDataByTypeApi useEffect 실행됨.")
            ConnectApi({ method: 'GET', url: `/v1/api/datahub/${hubId}?type=${classfiyType}`})
                .then((res) => {
                    switch (classfiyType) {
                        case 'doc':
                            setImageSrc('/doc.svg');
                            const updatedData = res.data.map((item:any) => {
                                const fileExtension = item.file_name.substring(item.file_name.lastIndexOf('.') + 1);
                                // 예시로, 확장자를 'extension' 속성에 저장 (실제 사용에 맞게 조정 필요)
                                return { ...item, docType: fileExtension };
                            });
                            setOriginList(updatedData);
                            break;
                        case 'img':
                            setOriginList(res.data);
                            setImageSrc('/img.svg');
                            break;
                        case 'video':
                            setOriginList(res.data);
                            setImageSrc('/video.svg');
                            break;
                        case 'url':
                            setOriginList(res.data);
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
    // useEffect(()=>{
    //     selectDataByTypeApi();
    // },[filterDocType]);
    useEffect(()=>{
        selectDataByTypeApi();
    },[IsRelandering]);
    
    useEffect(() => {
        selectDataByTypeApi();
    }, [classfiyType, IsRelandering, ]); //selectedF가 있었으나 뺌. 파일이 업로드 된후, 업로드한 파일이 포함된 케이스 고려때문에 잇엇지만, 정렬기능 만들며 충돌

    useEffect(() => {
        setListBySelc(originlist);
    }, [originlist]);
    
    useEffect(() => {
       
    }, [listByselc]);

    useEffect(() => {
    async function getContentBySelect() {
        // if(filterDocType )
        let datass: dataByTypeList = []; 
            if(classfiyType === 'url'){
                datass =await DataHub_searchWordIntheHub_url_module({ data: originlist },searchText, selected );
            }else{
                if(filterDocType?.length !== 0){
                    console.log(`classfiyType === 'doc' && filterDocType!== ${filterDocType}`);
                    datass =await filterDocsByType_module({ data: originlist },filterDocType );
                }else{
                    datass =await DataHub_searchWordIntheHub_module({ data: originlist },searchText, selected );
                 
                }; 
            };
            setListBySelc(datass);
        //    if(datass.length === 0){
        //     alert('원하시는 검색 결과가 없습니다.')
        //    }
           
        };
        
        getContentBySelect();
    }, [selected, searchText, classfiyType, filterDocType]);

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
                    writer:item.writer,
                    docType:item.file_name.substring(item.file_name.lastIndexOf('.') + 1),})
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