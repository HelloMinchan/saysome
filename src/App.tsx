import React, { useState } from "react";
import {
  RouteComponentProps,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

// import authentications
import AuthRoute from "./authentications/AuthRoute";
import {
  loginRequest,
  UserInfo,
  UserInfoForLoginRequest,
} from "./authentications/AuthRequest";

// import pages
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/Errorpage";

/***************************************************************************************
                              SaySome App 컴포넌트
                              Arguments : void
                              Return : FunctionComponent
                              마지막 수정 : 2020.04.28
***************************************************************************************/
const App: React.FC = (): JSX.Element => {
  // 유저 로그인 상태 hooks ( 변수 : user, 함수 : setUser )
  const [user, setUser]: [
    UserInfo | null,
    Function
  ] = useState<UserInfo | null>(null);
  // 유저 로그인 상태 변수
  const authenticated: boolean = user != null;

  /*
    로그인 요청 함수
    Arguments : UserInfoForLoginRequest
    Return : void
    ( AuthRequest 파일 loginRequest 함수 사용 )
  */
  const login: Function = ({
    email,
    password,
  }: UserInfoForLoginRequest): void =>
    setUser(loginRequest({ email, password }));

  /*
    로그아웃 요청 함수
    Arguments : void
    Return : void
  */
  const logout: Function = (): void => setUser(null);

  return (
    <Router>
      <Switch>
        {/*
          LoginPage 라우트
          URL : /login
          Authentication : All
        */}
        <Route
          path="/login"
          render={(RouteProps: RouteComponentProps<any>): JSX.Element => (
            <LoginPage
              authenticated={authenticated}
              login={login}
              {...RouteProps}
            />
          )}
        />

        {/*
          MainPage 라우트
          URL : /
          Authentication : True
        */}
        <AuthRoute
          authenticated={authenticated}
          exact
          path="/"
          render={(): JSX.Element => (
            <MainPage
              user={user}
              authenticated={authenticated}
              logout={logout}
            />
          )}
        />

        {/*
          ErrorPage 라우트
          URL : Undefined
          Authentication : All
        */}
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default App;
