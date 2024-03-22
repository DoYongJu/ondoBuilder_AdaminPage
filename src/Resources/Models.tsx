





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
export interface hubInfo extends Omit<MyObject, 'doc_count' | 'image_count' | 'video_count' |'url_count'>{
  hub_id:number;
  hub_name: string;
  datahub_regdate: string;
  datahub_upddate: string;
  hub_description: string;
}

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

export type Option = {
  id: number;
  name: string;
}

export interface UploadFileProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  oneFile?:File;
  fileType:string;
};
export interface UpdateFileProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fileType:string;
};
export interface dataByType{ 
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
  video_no:number;
  url_no:number;
  url_link:string;
  url_description:string;
  url_regdate:string;
  url_upddate:string;
  url_tag:string;
  file_prompt:string;
  file_tag:string;
  turn:number;
  carousel_name:string;
  carousel_id:number;
  image_no:number;
  url_name:string,
}
export interface userInfoType{
  email: string;
  company: string;
  username: string;
  division: string; 
  tel: string
}

export interface userPwdType{
  originPwd: string;
  newPwd: string;
  checkPwd: string;
}

export interface userFullInfoType{
  uid: number;
  email: string;
  tel: string;
  company: string;
  division: string;
  username: string;
  user_regdate: string;
  isVerified: boolean,
}
export interface imgInfoForCarsel{
  file_name: string;
  file_url?: string;
  turn: number;
  image_no: number;
  imageUrl: string;

}
export interface fileNoAndHubId{
  hub_id:number,
  file_no:number
}
export interface dataByDoc{
  hub_id:number,
  doc_no:number,
  file_name:string,
  file_description:string,
  file_regdate:string,
  file_upddate:string,
  file_size:string,
  file_prompt:string,
  download_url:string,
  writer:string,
  docType:string, 
}
export interface dataByVideo{
  hub_id:number,
  video_no:number,
  file_name:string,
  file_description:string,
  file_regdate:string,
  file_upddate:string,
  file_tag:string, 
  file_size:string,
  download_url:string,
  writer:string,
}
export interface dataByImg{
  hub_id:number,
  image_no:number,
  file_name:string,
  file_description:string,
  file_regdate:string,
  file_upddate:string,
  file_tag:string, 
  file_size:string,
  download_url:string,
  writer:string,
  turn:number,
  casosel_name:string;
  carosel_id:number;
 
}
export interface dataByUrl{
  hub_id:number,
  url_no:number,
  url_description:string,
  url_regdate:string,
  url_upddate:string,
  url_tag:string,
  writer:string,
  url_name:string,
}

export type imgInfoForCarselList = imgInfoForCarsel[];
export type userFullInfoList = userFullInfoType[];
export type dataByTypeList = dataByType[];
export type tagsList= tag[];
export type contentList = content[];
export type MyObjects = MyObject[];
export type Options = Option[];