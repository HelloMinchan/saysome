import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SignupUserInfoPage from "./SignupUserInfoPage";
import SignupEmailCheckPage from "./SignupEmailCheckPage";
import SignupReviewPage from "./SignupReviewPage";

import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

// import globalData
import { logoColor } from "../../globalData";

// import dotenv
import dotenv from "dotenv";

// import .env
dotenv.config();

/*
  이메일 중복체크 API 호출 함수
  method: POST
  Error Code : 3, 4
  Arguments : email
  Return : Promise<AxiosResponse<string> | any>
*/
const emailDuplicateCheckAxios = async (
  email: string
): Promise<AxiosResponse<any> | any> => {
  // form 생성
  const form = new FormData();
  // form에 데이터 추가
  form.append("email", email);

  try {
    // 이메일 중복체크 API 호출
    return await axios.post(
      `${process.env.REACT_APP_saysome_restful_server}/emailduplicatecheck`,
      form
    );
  } catch (error) {
    // 로그인 응답 실패 시 "API Error" 문자열 반환
    const apiError = "API Error";
    return apiError;
  }
};

/*
  회원가입 신청 API 호출 함수
  method: POST
  Error Code : 3, 4
  Arguments : email, password, name, food, provisionAccept, emailReceptionAccept
  Return : Promise<AxiosResponse<string> | any>
*/
const signupApplyAxios = async (
  email: string,
  password: string,
  name: string,
  food: string,
  provisionAccept: Boolean,
  emailReceptionAccept: Boolean
): Promise<AxiosResponse<any> | any> => {
  // form 생성
  const form = new FormData();
  // form에 데이터 추가
  form.append("email", email);
  form.append("password", password);
  form.append("name", name);
  form.append("food", food);
  form.append("provisionAccept", provisionAccept.toString());
  form.append("emailReceptionAccept", emailReceptionAccept.toString());

  try {
    // 이메일 중복체크 API 호출
    return await axios.post(
      `${process.env.REACT_APP_saysome_restful_server}/signupapply`,
      form
    );
  } catch (error) {
    // 로그인 응답 실패 시 "API Error" 문자열 반환
    const apiError = "API Error";
    return apiError;
  }
};

/*
  경고창 생성 함수
  Arguments : void
  Return : JSX.Element
*/
const Alert: Function = (props: AlertProps): JSX.Element => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

/* Material-UI useStyle */
const useStyles = makeStyles((theme) => ({
  //appBar 컴포넌트
  appBar: {
    position: "relative",
    background: logoColor,
  },
  //layout 컴포넌트
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  //paper 컴포넌트
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  //stepper 컴포넌트
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  //buttons 컴포넌트
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  //button 컴포넌트
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

/***************************************************************************************
                              SignupControlPage 컴포넌트
                              Arguments : void
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.23
***************************************************************************************/
const SignupControlPage: React.FC = () => {
  // useStyle Call
  const classes = useStyles();

  // 회원가입 단계 hooks ( 변수 : activeStep, 함수 : setActiveStep )
  const [activeStep, setActiveStep]: [number, Function] = useState<number>(0);

  // 회원가입 이름 hooks ( 변수 : createName, 함수 : setCreateName )
  const [createName, setCreateName]: [string, Function] = useState<string>("");
  // 회원가입 이메일 hooks ( 변수 : createEmail, 함수 : setCreateEmail )
  const [createEmail, setCreateEmail]: [string, Function] = useState<string>(
    ""
  );
  // 회원가입 이메일 중복체크 hooks ( 변수 : createEmailDuplicateCheck, 함수 : setCreateEmailDuplicateCheck )
  const [createEmailDuplicateCheck, setCreateEmailDuplicateCheck]: [
    boolean,
    Function
  ] = useState<boolean>(false);
  // 회원가입 이메일 중복체크 문구 hooks ( 변수 : createEmailDuplicateCheckSentence, 함수 : setCreateEmailDuplicateCheckSentence )
  const [
    createEmailDuplicateCheckSentence,
    setCreateEmailDuplicateCheckSentence,
  ]: [string, Function] = useState<string>("");
  // 회원가입 비밀번호1 hooks ( 변수 : createPassword1, 함수 : setCreatePassword1 )
  const [createPassword1, setCreatePassword1]: [string, Function] = useState<
    string
  >("");
  // 회원가입 비밀번호2 hooks ( 변수 : createPassword2, 함수 : setCreatePassword2 )
  const [createPassword2, setCreatePassword2]: [string, Function] = useState<
    string
  >("");
  // 회원가입 좋아하는 음식 hooks ( 변수 : createFavoriteFood, 함수 : setCreateFavoriteFood )
  const [createFavoriteFood, setCreateFavoriteFood]: [
    string,
    Function
  ] = useState<string>("");

  // 이메일 인증코드 hooks ( 변수 : activeStep, 함수 : setActiveStep )
  const [authEmailCode, setAuthEmailCode]: [string, Function] = useState<
    string
  >("");

  // 이용약관 동의 체크 hooks ( 변수 : provisionAcceptCheck, 함수 : setProvisionAcceptCheck )
  const [provisionAcceptCheck, setProvisionAcceptCheck]: [
    boolean,
    Function
  ] = useState<boolean>(false);
  // 이메일 수신 동의 체크 hooks ( 변수 : emailReceptionAcceptCheck, 함수 : setEmailReceptionAcceptCheck )
  const [emailReceptionAcceptCheck, setEmailReceptionAcceptCheck]: [
    boolean,
    Function
  ] = useState<boolean>(false);

  // 경고창 생성 hooks ( 변수 : error, 함수 : setError )
  const [error, setError]: [boolean, Function] = useState<boolean>(false);
  // 경고창 메시지 hooks ( 변수 : errorMessage, 함수 : setErrorMessage )
  const [errorMessage, setErrorMessage]: [string, Function] = useState<string>(
    ""
  );
  // 이메일 중복체크 응답 실패 경고창 생성 hooks ( 변수 : warning, 함수 : setWarning )
  const [warning, setWarning]: [boolean, Function] = useState<boolean>(false);
  // 이메일 중복체크 에러코드 hooks ( 변수 : warningCode, 함수 : setWarningCode )
  const [warningCode, setWarningCode]: [string, Function] = useState<string>(
    ""
  );

  /*
    이메일 중복체크 함수
    Arguments : createEmail
    Return : Promise<void>
  */
  const emailDuplicateCheckRequest: Function = async (): Promise<void> => {
    // 이메일에 @ 혹은 . 이 없을 경우 경고창 생성
    if (createEmail.indexOf("@") === -1 || createEmail.indexOf(".") === -1) {
      setCreateEmailDuplicateCheck(false);
      setCreateEmailDuplicateCheckSentence(
        "올바르지 않은 이메일 형식입니다! 제대로 입력해 주세요."
      );
      return;
    }

    // 이메일 중복체크 API 호출
    const data = await emailDuplicateCheckAxios(createEmail);

    // 이메일 중복체크 응답 실패 시 경고창 생성
    // 에러코드 : 3
    if (data === "API Error") {
      setWarningCode("3");
      setWarning(true);
    } else {
      // 데이터베이스 응답 실패 시 경고창 생성
      // 에러코드 : 4
      if (data.data.CheckValue === "Database Error") {
        setWarningCode("4");
        setWarning(true);
      }
      // 이메일 사용 가능한 경우
      else if (data.data.CheckValue === "OK") {
        setCreateEmailDuplicateCheck(true);
        setCreateEmailDuplicateCheckSentence("사용 가능한 이메일 입니다!");
      } else {
        // 이메일이 중복된 경우
        setCreateEmailDuplicateCheck(false);
        setCreateEmailDuplicateCheckSentence(
          "중복된 이메일 입니다! 다른 이메일을 사용해주세요."
        );
      }
    }
  };

  /*
    회원가입 신청 함수
    Arguments : createEmail, createPassword1, createName, createFavoriteFood, provisionAcceptCheck,emailReceptionAcceptCheck
    Return : Promise<void>
  */
  const signupApplyRequest: Function = async (): Promise<void | string> => {
    // 이메일 중복체크 API 호출
    const data = await signupApplyAxios(
      createEmail,
      createPassword1,
      createName,
      createFavoriteFood,
      provisionAcceptCheck,
      emailReceptionAcceptCheck
    );

    // 회원가입 신청 응답 실패 시 경고창 생성
    // 에러코드 : 5
    if (data === "API Error") {
      setWarningCode("5");
      setWarning(true);
    } else {
      // 데이터베이스 응답 실패 시 경고창 생성
      // 에러코드 : 6
      if (data.data.CheckValue === "Database Error") {
        setWarningCode("6");
        setWarning(true);
      }
      // 데이터베이스에 쿼리 수행은 됬는데 결과 에러 발생 시 경고창 생성
      // 에러코드 : 7
      else if (data.data.CheckValue === "Database Error2") {
        setWarningCode("7");
        setWarning(true);
      }
      // 이메일 사용 가능한 경우
      else {
        return "OK";
      }
    }
  };

  /*
    경고창 끄기 버튼 클릭 함수
    Arguments : void
    Return : void
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

  // 회원가입 단계 표시 리스트
  const steps: Array<string> = [
    "회원정보 입력",
    "이메일 인증",
    "회원가입 신청",
  ];

  /*
    회원가입 단계 조절 함수
    Arguments : step
    Return : FunctionComponent | Error
    ( Error : 스텝 페이지 초과 에러 )
  */
  const getStepContent: Function = (step: number): any => {
    switch (step) {
      // 회원정보 입력 단계
      case 0:
        return (
          <SignupUserInfoPage
            createName={createName}
            createEmail={createEmail}
            createEmailDuplicateCheck={createEmailDuplicateCheck}
            createEmailDuplicateCheckSentence={
              createEmailDuplicateCheckSentence
            }
            createPassword1={createPassword1}
            createPassword2={createPassword2}
            createFavoriteFood={createFavoriteFood}
            setCreateName={setCreateName}
            setCreateEmail={setCreateEmail}
            setCreatePassword1={setCreatePassword1}
            setCreatePassword2={setCreatePassword2}
            setCreateFavoriteFood={setCreateFavoriteFood}
            emailDuplicateCheckRequest={emailDuplicateCheckRequest}
          />
        );
      // 이메일 인증 단계
      case 1:
        return (
          <SignupEmailCheckPage
            createEmail={createEmail}
            authEmailCode={authEmailCode}
            setAuthEmailCode={setAuthEmailCode}
          />
        );
      // 회원가입 신청 단계
      case 2:
        return (
          <SignupReviewPage
            createName={createName}
            createEmail={createEmail}
            createPassword1={createPassword1}
            createFavoriteFood={createFavoriteFood}
            provisionAcceptCheck={provisionAcceptCheck}
            setProvisionAcceptCheck={setProvisionAcceptCheck}
            emailReceptionAcceptCheck={emailReceptionAcceptCheck}
            setEmailReceptionAcceptCheck={setEmailReceptionAcceptCheck}
          />
        );
      // 스텝 에러
      default:
        throw new Error("스텝 에러!");
    }
  };

  /*
    다음으로 버튼 처리 함수
    Arguments : void
    Return : void
  */
  const handleStepNext: any = async (): Promise<void> => {
    // 회원정보 입력 단계
    if (activeStep === 0) {
      // 회원정보 미 기입 시 경고창 생성
      if (
        createName === "" ||
        createEmail === "" ||
        createPassword1 === "" ||
        createPassword2 === "" ||
        createFavoriteFood === ""
      ) {
        setErrorMessage("회원정보 기입을 전부 해주셔야 합니다!");
        setError(true);
        return;
      }

      // 작성한 비밀번호가 불일치 시 경고창 생성
      if (createPassword1 !== createPassword2) {
        setErrorMessage("작성하신 비빌먼호가 일치하지 않습니다!");
        setError(true);
        return;
      }

      // 이메일 중복체크 안했을 시 경고창 생성
      if (createEmailDuplicateCheck === false) {
        setErrorMessage("이메일 중복체크를 완료해 주셔야 합니다!");
        setError(true);
        return;
      }
    }
    // 이메일 인증 단계
    else if (activeStep === 1) {
      // 이메일 인증 코드가 유효하지 않을 시 경고창 생성
      if (authEmailCode !== "1234") {
        setErrorMessage("인증코드가 유효하지 않습니다!");
        setError(true);
        return;
      }
    }
    // 회원가입 신청 단계
    else if (activeStep === 2) {
      // 이용약관 체크 안했을 시 경고창 생성
      if (provisionAcceptCheck === false) {
        setErrorMessage("필수 사항은 반드시 체크하셔야 합니다!");
        setError(true);
        return;
      }

      // 데이터베이스에 회원정보 기록 실패 시 다음 화면으로 이동 막음
      if ((await signupApplyRequest()) !== "OK") {
        return;
      }
    }

    // 위의 모든 조건들 통과 시 다음 단계 진행
    setActiveStep(activeStep + 1);
  };

  /*
    이전으로 버튼 처리 함수
    Arguments : void
    Return : void
  */
  const handleStepBack: any = (): void => {
    setActiveStep(activeStep - 1);
  };

  // history 강제로 가져오기
  let history: any = useHistory();

  /*
    로그인 화면으로 버튼 처리 함수
    Arguments : void
    Return : void
  */
  const goLoginPageClick: any = (): void => {
    history.push("/");
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

  /***************/
  /* 생명주기 관리 */
  /***************/
  useEffect(() => {
    // 회원 가입 중 돌아갈 시 실수 방지 확인
    if (activeStep < 3) {
      const unblock = history.block(
        "\n정말로 돌아가시겠습니까?\n작성하신 정보는 저장되지 않습니다."
      );
      return () => {
        unblock();
      };
    }
  }, [activeStep, history]);

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="absolute" color="default" className={classes.appBar}>
        <TitleLogo>{"SaySome"}</TitleLogo>
      </AppBar>

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  안녕하세요 {createName}님! 가입신청이 완료되었습니다.
                </Typography>
                <Typography variant="subtitle1">
                  아래의 로그인 하러가기 버튼을 눌러 로그인 후 SaySome의 모든
                  기능을 이용해보세요!
                </Typography>
                <SignupFinishLoginButtonPosition>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={goLoginPageClick}
                  >
                    로그인 하러가기
                  </Button>
                </SignupFinishLoginButtonPosition>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}

                <div className={classes.buttons}>
                  <Button
                    onClick={goLoginPageClick}
                    color={"primary"}
                    className={classes.button}
                  >
                    로그인 화면으로
                  </Button>
                  {activeStep !== 0 && (
                    <Button onClick={handleStepBack} className={classes.button}>
                      {"이전으로"}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStepNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "가입신청" : "다음으로"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>

      <LoginBottomContainer>
        {/* 하단 카피라이트 */}
        <Copyright />
      </LoginBottomContainer>

      {/* 경고창 */}
      <Snackbar open={error} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      {/* 로그인 응답 실패 경고창 */}
      {/* autoHideDuration Props에 null 설정 시 자동 사라짐 비활성화되므로 주의 */}
      <Snackbar open={warning} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {`에러코드 : ${warningCode}, 고객센터에 문의해 주세요!`}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

/* styled-components */
// 로고 컴포넌트
const TitleLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2vmax;
  font-family: "Baloo Tammudu 2", cursive;
  font-size: 4vmax;
  color: white;
`;

// 회원가입 하단 부 높이 지정 컴포넌트
const LoginBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  width: 100%;
`;

// 회원가입 완료 후 로그인 하러가기 버튼 위치 조절 컴포넌트
const SignupFinishLoginButtonPosition = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
`;
export default SignupControlPage;
