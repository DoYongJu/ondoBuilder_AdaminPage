





export interface Users {
  userId: number;
  username: string;
  password: string;
}


export interface MyObject {
  hub_id:number;
  hub_name: string;
  datahub_regdate: string;
  datahub_upddate: string;
  hub_description: string;
  // writer_uid ->태호씨는 줌. 추후에 필요하면 추가.
  doc_count: number,
  image_count: number,

  video_count: number,
  url_count: number,
};

interface content{
  name: string,
  val: number,
}
export interface dataProps {
  data: MyObject;
}
export interface tag{
  name: string | undefined; 
}
export interface UploadedInfo {
  name: string;
  size: number;
  type: string;
}
export interface UploadFileProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  oneFile?:File;
  fileType:string;
};
interface selCaroselGroup{
  carousel_id: number;
  carousel_name: string;
}
interface dataByType{ 
  doc_no: number;
  download_url: string;
  file_name:string;
  file_name_type:string;
  file_description:string;
  content_type: string;
  file_size: string;
  file_src: string;
  file_regdate: string;
  file_upddate: string;
  writer: string;
  url_link:string;
  url_description:string;
  url_regdate:string;
  url_upddate:string;

}
// export interface dataForUploadType{
//   hub_id: number,
//   file_tag: tagsList,
//   file_description: string,
//   carousel_id: number,
//   turn: number,
//   url_tag: string,
//   url_description: string,
//   doc:string
// }
export interface userInfoType{
  email: string;
  company: string;
  username: string;
  division: string; 
  tel: string
}
export type dataByTypeList = dataByType[];
export type selCaroselGroupList = selCaroselGroup[];
export type tagsList= tag[];
export type contentList = content[];
export type MyObjects = MyObject[];