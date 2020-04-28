import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

// 로그아웃 버튼 컴포턴트 타입 ( Route의 match, history, location 타입 상속 )
interface LogoutButtonProps extends RouteComponentProps<any> {
  logout: Function;
}

/***************************************************************************************
                              로그아웃 버튼 컴포넌트
                              Arguments : LogoutButtonProps
                              Return : FunctionComponent
                              마지막 수정 : 2020.04.28
***************************************************************************************/
const LogoutButton: React.FC<LogoutButtonProps> = ({
  logout,
  history,
}): JSX.Element => {
  const handleClick: any = (): void => {
    logout();
    history.push("/");
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default withRouter(LogoutButton);
