import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

// 로그아웃 버튼 컴포턴트 타입 ( Route의 match, history, location 타입 상속 )
interface LogoutButtonProps extends RouteComponentProps<any> {
  logout: Function;
}

/***************************************************************************************
                              로그아웃 버튼 컴포넌트
                              Arguments : LogoutButtonProps
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.23
***************************************************************************************/
const LogoutButton: React.FC<LogoutButtonProps> = ({
  logout,
  history,
}): JSX.Element => {
  const handleClick: any = (): void => {
    logout();
    history.push("/");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      로그아웃
    </Button>
  );
};

export default withRouter(LogoutButton);
