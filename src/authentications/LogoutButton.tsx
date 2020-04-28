import React from "react";
import { withRouter } from "react-router-dom";

/*
  로그아웃 버튼 컴포넌트
  Arguments : logout, history
  Return : 컴포넌트
*/
function LogoutButton({ logout, history }: any): JSX.Element {
  const handleClick = () => {
    logout();
    history.push("/");
  };
  return <button onClick={handleClick}>Logout</button>;
}

export default withRouter(LogoutButton);
