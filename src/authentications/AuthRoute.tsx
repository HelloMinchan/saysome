import React from "react";
import { Route, Redirect } from "react-router-dom";

// 로그아웃 버튼 컴포턴트 타입
interface AuthRouteProps {
  authenticated: boolean;
  render: Function;
  exact?: boolean;
  path?: string;
}

/***************************************************************************************
                              인증 라우트 컴포넌트
                              Arguments : AuthRouteProps
                              Return : FunctionComponent
                              마지막 수정 : 2020.04.28
***************************************************************************************/
const AuthRoute: React.FC<AuthRouteProps> = ({ authenticated, render }) => {
  return (
    <Route
      render={(props) =>
        // 로그인 상태인가?
        authenticated ? (
          // 렌더 컴포넌트가 있는가?
          render ? (
            // 로그인 상태일 시 선택한 화면으로 라우트
            render(props)
          ) : (
            // 로그인 상태지만 렌더 컴포넌트가 없을 시 빈 화면 그리기
            <></>
          )
        ) : (
          // 비로그인 상태일 시 로그인 화면으로 Redirect
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
