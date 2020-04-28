const users = [{ email: "test@naver.com", password: "123", name: "Minchan" }];

export interface UserInfoForLoginRequest {
  email: string;
  password: string;
}

export function signIn({ email, password }: UserInfoForLoginRequest): any {
  const user: any = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user === undefined) throw new Error();
  return user;
}
