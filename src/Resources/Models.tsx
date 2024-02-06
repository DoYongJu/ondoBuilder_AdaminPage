

export interface Users {
  userId: number;
  username: string;
  password: string;
}


export interface MyObject {
  hub_id:number;
  name: string;
  generateDate: string;
  lastEditDate: string;
  title: string;
  doc: number,
  img: number,
  text: number,
  link: number,

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

export type tagsList= tag[];
export type contentList = content[];
export type MyObjects = MyObject[];