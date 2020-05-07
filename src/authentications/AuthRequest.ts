import axios from "axios";

// import dotenv
import dotenv from "dotenv";

// import .env
dotenv.config();

// 유저 정보 타입
export interface UserInfo {
  email: string;
  password: string;
  name: string;
}

/*
  로그인 API 호출 함수
  Arguments : email, password
  Return : Promise<UserInfo | string>
*/
const loginAxios = async (
  email: string,
  password: string
): Promise<UserInfo | string> => {
  const data = await axios(
    `${process.env.REACT_APP_saysome_restful_server}/login/${email}/${password}`
  );
  return data.data;
};

/*
  로그인 함수
  Arguments : email, password
  Return : Promise<UserInfo | string>
*/
export const loginRequest: Function = async (
  email: string,
  password: string
): Promise<UserInfo | string> => {
  const data = await loginAxios(email, password);
  return data;
};
