import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

/***************************************************************************************
                              SignupEmailCheckPage 컴포넌트
                              Arguments : createEmail,
                                          authEmailCode,
                                          setAuthEmailCode
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.21
***************************************************************************************/
const SignupEmailCheckPage: React.FC<any> = ({
  createEmail,
  authEmailCode,
  setAuthEmailCode,
}) => {
  // 인증 대기시간(분) hooks ( 변수 : minute, 함수 : setAcsetMinutetiveStep )
  const [minute, setMinute]: [number, Function] = useState<number>(2);
  // 인증 대기시간(초) hooks ( 변수 : second, 함수 : setSecond )
  const [second, setSecond]: [number, Function] = useState<number>(59);
  // 인증 대기시간(초의 십의자리 0 표현) hooks ( 변수 : fakeSecond, 함수 : setFakeSecond )
  const [fakeSecond, setFakeSecond]: [string, Function] = useState<string>("");

  /***************/
  /* 생명주기 관리 */
  /***************/
  useEffect(() => {
    // 0초가 됬을 때 1분 감소 및 59초로 초기화
    if (second === 0) {
      setMinute(minute - 1);
      setSecond(59);
    }

    // 10 초 미만일 시 십의자리 0 표현
    if (second < 10) {
      setFakeSecond("0");
    } else {
      setFakeSecond("");
    }

    /*
      1초씩 감소시키는 함수
      Arguments : void
      Return : void
      ( 함수화하지 않을 시 맨 처음 초기화 값부터 업테이트 값까지 반복 감소함 )
    */
    const decreaseSecond = setInterval((): void => {
      setSecond((second: number) => second - 1);
    }, 1000);
    return () => {
      clearInterval(decreaseSecond);
    };
  }, [minute, second, fakeSecond]);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
        인증 메일이 발송되었습니다
      </Typography>
      {/* 비밀번호 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        메일함에서({createEmail}) 인증 메일을 확인하시어 인증 코드를 기입해
        주세요.
      </Typography>
      <Typography variant="h6" gutterBottom style={{ marginBottom: "25px" }}>
        이메일 인증 불가 시 회원가입을 진행하실 수 없습니다.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="AuthEmailCode"
            name="AuthEmailCode"
            fullWidth
            defaultValue={authEmailCode}
            onChange={({ target: { value } }) => setAuthEmailCode(value)}
            // defaultValue={}
            // onChange={({ target: { value } }) => (value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CountDown>
            0{minute}:{fakeSecond}
            {second}
          </CountDown>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

/* styled-components */
// 인증 대기시간 표시 컴포넌트
const CountDown = styled.div`
  margin-top: 8.7px;
  color: red;
  font-weight: bold;
`;

export default SignupEmailCheckPage;
