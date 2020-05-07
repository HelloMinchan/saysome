import React, { useState } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Box,
  Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

// import authentications
import { loginRequest } from "../authentications/AuthRequest";

// import globalData
import { logoColor, loginButtonColor } from "../globalData";

/*
  로그인 실패 경고창 생성 함수
  Arguments : void
  Return : JSX.Element
*/
const Alert: Function = (props: AlertProps): JSX.Element => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

// LoginPage 컴포넌트 타입 ( Route의 match, history, location 타입 상속 )
interface LoginPageProps extends RouteComponentProps<any> {
  authenticated: boolean;
  login: Function;
}

/***************************************************************************************
                              LoginPage 컴포넌트
                              Arguments : LoginPageProps
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.07
***************************************************************************************/
const LoginPage: React.FC<LoginPageProps> = ({
  authenticated,
  login,
  location,
}) => {
  // 유저 로그인 이메일 hooks ( 변수 : email, 함수 : setEmail )
  const [email, setEmail]: [string, Function] = useState<string>("");
  // 유저 로그인 비밀번호 hooks ( 변수 : password, 함수 : setPassword )
  const [password, setPassword]: [string, Function] = useState<string>("");
  // 로그인 실패 경고창 생성 hooks ( 변수 : warning, 함수 : setWarning )
  const [warning, setWarning]: [boolean, Function] = useState<boolean>(false);

  /*
    로그인 버튼 클릭 함수
    Arguments : void
    Return : void
    ( AuthRequest 파일 loginRequest 함수 사용 )
  */
  const loginClick: any = async (): Promise<void> => {
    const userData = await loginRequest(email, password);
    // 로그인 실패시 API 서버에서 "Error" 문자열 반환됨
    if (userData === "Error") {
      // App.tsx의 login Hook 함수에 null 반환
      login(null);
      // 로그인 실패시 경고창 생성 및 이메일 비빌번호 값 초기화
      setWarning(true);
      setEmail("");
      setPassword("");
    } else {
      // App.tsx의 login Hook 함수에 user 객체 반환
      login(userData);
    }
  };

  /*
    로그인 실패 경고창 끄기 버튼 클릭 함수
    Arguments : void
    Return : void
    ( AuthRequest 파일 loginRequest 함수 사용 )
  */
  const handleClose: any = (
    event?: React.SyntheticEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setWarning(false);
  };

  /*
    카피라이트 함수
    Arguments : void
    Return : JSX.Element
  */
  const Copyright: Function = (): JSX.Element => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © HelloMinchan "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  // location.state로 현재위치를 얻거나 아니면 루트 path
  const from: any = location.state || { from: { pathname: "/" } };

  // 변경 전 : const { from } = location.state || { from: { pathname: "/" } };
  // 만약 로그인 상태일 시 from으로 Redirect
  if (authenticated) return <Redirect to={from} />;

  return (
    <Contatiner>
      <TitleLogo>{"Say Some"}</TitleLogo>
      {/* 아이디 입력란 */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={({ target: { value } }) => setEmail(value)}
      />

      {/* 비밀번호 입력란 */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={({ target: { value } }) => setPassword(value)}
      />

      {/* 로그인 상태 유지 체크 버튼 */}
      <StyledvFormControlLabel
        control={<Checkbox value="remember" />}
        label="로그인 상태 유지"
      />

      {/* 로그인 버튼 */}
      <StyledButton
        onClick={loginClick}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ background: loginButtonColor, marginBottom: "1%" }}
      >
        {"로그인"}
      </StyledButton>

      <Grid container>
        {/* 비밀번호 조회 링크 */}
        <Grid item xs>
          <Link href="#" variant="body2">
            {"비밀번호 잊어버리셨나요?"}
          </Link>
        </Grid>
        {/* 회원가입 링크 */}
        <Grid item>
          <Link href="#" variant="body2">
            {"아직 회원이 아니신가요? 가입하기"}
          </Link>
        </Grid>
      </Grid>
      {/* 하단 카피라이트 */}
      <Box mt={8}>
        <Copyright />
      </Box>
      {/* 로그인 실패 경고창 */}
      <Snackbar open={warning} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {"이메일 혹은 비빌먼호를 확인하세요!"}
        </Alert>
      </Snackbar>
    </Contatiner>
  );
};

/* styled-components */
// 컨테이너 컴포넌트
const Contatiner = styled.div`
  /* background-color: #262626; */
  height: 100%;
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 로고 컴포넌트
const TitleLogo = styled.h1`
  padding-top: 17%;
  padding-bottom: 10%;
  font-family: "Baloo Tammudu 2", cursive;
  font-size: 10vmax;
  color: ${logoColor};
`;

// 로그인 상태 유지 체크 박스 컴포넌트
const StyledvFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
`;

// 로그인 버튼 컴포넌트
const StyledButton = styled(Button)`
  height: 45px;
`;

export default LoginPage;
