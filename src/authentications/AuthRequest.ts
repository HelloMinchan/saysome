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
  method: POST
  Arguments : email, password
  Return : Promise<AxiosResponse<UserInfo | string> | string>
*/
const loginAxios = async (
  email: string,
  password: string
): Promise<AxiosResponse<UserInfo | string> | string> => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  try {
    // 로그인 API 호출
    return await axios.post(
      `${process.env.REACT_APP_saysome_restful_server}/login`,
      form
    );
  } catch (error) {
    // 로그인 응답 실패 시 "API Error" 문자열 반환
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
