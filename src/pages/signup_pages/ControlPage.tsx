import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserInfoPage from "./UserInfoPage";
import EmailCheckPage from "./EmailCheckPage";
import Review from "./Review";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

// import globalData
import { logoColor } from "../../globalData";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: logoColor,
  },
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["회원정보 입력", "이메일 인증", "회원가입 신청"];

function getStepContent(step: any) {
  switch (step) {
    case 0:
      return <UserInfoPage />;
    case 1:
      return <EmailCheckPage />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function ControlPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // history 강제로 가져오기
  let history = useHistory();

  const gobackClick = () => {
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

  // 회원 가입 중 돌아갈 시 실수 방지 확인
  useEffect(() => {
    const unblock = history.block(
      "\n정말로 돌아가시겠습니까?\n작성된 정보는 저장되지 않습니다."
    );
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <button onClick={gobackClick}>돌아가기</button>

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
                  가입신청이 완료되었습니다.
                </Typography>
                <Typography variant="subtitle1">
                  Hello, 가입자명! Welcome to SaySome!
                </Typography>
                <button onClick={gobackClick}>로그인 하러가기</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      {"돌아가기"}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
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
    </React.Fragment>
  );
}

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
