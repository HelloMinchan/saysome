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
                              마지막 수정 : 2020.05.22
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

  // 로그인 실패 경고창 생성 hooks ( 변수 : error, 함수 : setError )
  const [error, setError]: [boolean, Function] = useState<boolean>(false);
  // 로그인 응답 실패 경고창 생성 hooks ( 변수 : warning, 함수 : setWarning )
  const [warning, setWarning]: [boolean, Function] = useState<boolean>(false);
  // 로그인 응답 실패 에러코드 hooks ( 변수 : warningCode, 함수 : setWarningCode )
  const [warningCode, setWarningCode]: [string, Function] = useState<string>(
    ""
  );

  /*
    로그인 버튼 클릭 함수
    Arguments : void
    Return : Promise<void>
    ( AuthRequest 파일 loginRequest 함수 사용 )
  */
  const loginClick: any = async (): Promise<void> => {
    // 이메일 혹은 비밀번호 입력 안했을 시 로그인 실패 처리
    if (email === "" || password === "") {
      // 로그인 실패 시 경고창 생성
      setError(true);
    } else {
      const userData = await loginRequest(email, password);
      // 로그인 응답 실패 시 API 서버에서 Error 객체 반환 후 loginRquest에서 "API Error" 문자열 반환됨
      if (userData === "API Error") {
        // App.tsx의 login Hook 함수에 null 반환
        login(null);
        // 로그인 응답 실패 시 경고창 생성
        // 에러코드 : 1
        setWarningCode("1");
        setWarning(true);
      } else if (userData.data.CheckValue === "Database Error") {
        // 데이터베이스 응답 실패 시 경고창 생성
        // 에러코드 : 2
        setWarningCode("2");
        setWarning(true);
      }
      // 로그인 실패 시 API 서버에서 "Error" 문자열 반환됨
      else if (userData.data === "Error") {
        // App.tsx의 login Hook 함수에 null 반환
        login(null);
        // 로그인 실패 시 경고창 생성
        setError(true);
      } else {
        // App.tsx의 login Hook 함수에 userData.data 객체 반환
        login(userData.data);
      }
    }
  };

  /*
    경고창 끄기 버튼 클릭 함수
    Arguments : void
    Return : void
    ( AuthRequest 파일 loginRequest 함수 사용 )
    ( 자동 사라짐 기능 의존 함수 )
  */
  const handleClose: any = (
    event?: React.SyntheticEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
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

      <LoginLoigcContainer>
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
          defaultValue={email}
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
          defaultValue={password}
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
            <Link href="#/signup" variant="body2">
              {"아직 회원이 아니신가요? 가입하기"}
            </Link>
          </Grid>
        </Grid>
      </LoginLoigcContainer>

      <LoginBottomContainer>
        {/* 하단 카피라이트 */}
        <Copyright />
      </LoginBottomContainer>

      {/* 로그인 실패 경고창 */}
      <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {"이메일 혹은 비빌먼호를 확인하세요!"}
        </Alert>
      </Snackbar>
      {/* 로그인 응답 실패 경고창 */}
      {/* autoHideDuration Props에 null 설정 시 자동 사라짐 비활성화되므로 주의 */}
      <Snackbar open={warning} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {`에러코드 : ${warningCode}, 고객센터에 문의해 주세요!`}
        </Alert>
      </Snackbar>
    </Contatiner>
  );
};

/* styled-components */
// 컨테이너 컴포넌트
const Contatiner = styled.div`
  /* background-color: #808080; */
  height: 100%;
  width: 50%;
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  flex-direction: column;
`;

// 로고 컴포넌트
const TitleLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
  padding-top: 17%;
  font-family: "Baloo Tammudu 2", cursive;
  font-size: 10vmax;
  color: ${logoColor};
`;

// 로그인 로직 부분 높이 지정 컴포넌트
const LoginLoigcContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

// 로그인 하단 부 높이 지정 컴포넌트
const LoginBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
`;

export default LoginPage;
