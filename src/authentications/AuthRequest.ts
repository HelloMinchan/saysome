import axios, { AxiosResponse } from "axios";

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
  Return : Promise<AxiosResponse<UserInfo | string> | string>
*/
const loginAxios = async (
  email: string,
  password: string
): Promise<AxiosResponse<UserInfo | string> | string> => {
  try {
    return await axios(
      `${process.env.REACT_APP_saysome_restful_server}/login/${email}/${password}`
    );
  } catch (error) {
    const apiError = "API Error";
    return apiError;
  }
};

/*
  로그인 함수
  Arguments : email, password
  Return : Promise<AxiosResponse<UserInfo | string> | string>
*/
export const loginRequest: Function = async (
  email: string,
  password: string
): Promise<AxiosResponse<UserInfo | string> | string> => {
  const data = await loginAxios(email, password);
  return data;
};
