import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SignUpPage: React.FC = () => {
  let history = useHistory();

  const gobackClick = () => {
    history.push("/");
  };

  return (
    <>
      <h1>회원 가입</h1>
      <button onClick={gobackClick}>돌아가기</button>
    </>
  );
};

export default SignUpPage;
