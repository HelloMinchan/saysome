// 유저 정보 타입
export interface UserInfo {
  email: string;
  password: string;
  name: string;
}

// 로그인 유저 정보 타입
export interface UserInfoForLoginRequest {
  email: string;
  password: string;
}

// 임시 유저 데이터 베이스 객체 ( 차후 GraphQL & Apollo로 변경할 것 )
const users: Array<UserInfo> = [
  { email: "test@naver.com", password: "123", name: "정민찬" },
];

/*
  로그인 함수
  Arguments : UserInfoForLoginRequest
  Return : UserInfo
*/
export const loginRequest: Function = ({
  email,
  password,
}: UserInfoForLoginRequest): UserInfo | never => {
  const user: UserInfo | undefined = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
};
