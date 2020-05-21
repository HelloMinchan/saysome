import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import styled, { css, StyledComponent } from "styled-components";

/***************************************************************************************
                              SignupUserInfoPage 컴포넌트
                              Arguments : createName,
                                          createEmail,
                                          createEmailDuplicateCheck,
                                          createEmailDuplicateCheckSentence,
                                          createPassword1,
                                          createPassword2,
                                          createFavoriteFood,
                                          setCreateName,
                                          setCreateEmail,
                                          setCreatePassword1,
                                          setCreatePassword2,
                                          setCreateFavoriteFood,
                                          emailDuplicateCheckRequest,
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.22
***************************************************************************************/
const SignupUserInfoPage: React.FC<any> = ({
  createName,
  createEmail,
  createEmailDuplicateCheck,
  createEmailDuplicateCheckSentence,
  createPassword1,
  createPassword2,
  createFavoriteFood,
  setCreateName,
  setCreateEmail,
  setCreatePassword1,
  setCreatePassword2,
  setCreateFavoriteFood,
  emailDuplicateCheckRequest,
}) => {
  return (
    <React.Fragment>
      {/* 이름 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        당신의 이름은 무엇인가요?
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Name"
          name="Name"
          label="이름 : 예) 홍길동"
          fullWidth
          defaultValue={createName}
          onChange={({ target: { value } }) => setCreateName(value)}
        />
      </Grid>

      <Separation />

      {/* 이메일 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        이메일을 입력해 주세요.
      </Typography>
      <Grid item xs={10}>
        <TextField
          required
          id="Email"
          name="Email"
          label="이메일 : 예) egeolwhyhaeseokham@saysome.com"
          fullWidth
          autoComplete="billing address-line1"
          defaultValue={createEmail}
          onChange={({ target: { value } }) => setCreateEmail(value)}
        />
      </Grid>

      <Separation />

      <EmailDuplicateCheck
        createEmailDuplicateCheck={createEmailDuplicateCheck}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={emailDuplicateCheckRequest}
        >
          {"이메일 중복체크"}
        </Button>
        <Typography
          variant="body1"
          gutterBottom
          style={{ paddingLeft: "15px", paddingTop: "7px" }}
        >
          {createEmailDuplicateCheckSentence}
        </Typography>
      </EmailDuplicateCheck>

      <Separation />

      {/* 비밀번호 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        비밀번호를 입력해 주세요.
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Password1"
          name="Password1"
          type="password"
          label="비밀번호 : 예) 1q2w3e4r!"
          fullWidth
          autoComplete="current-password"
          defaultValue={createPassword1}
          onChange={({ target: { value } }) => setCreatePassword1(value)}
        />
      </Grid>

      <Separation />

      {/* 비밀번호 확인 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        비밀번호를 다시 한번 입력해 주세요.
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Password2"
          name="Password2"
          type="password"
          label="비밀번호 확인 : 예) 1q2w3e4r!"
          fullWidth
          autoComplete="current-password"
          defaultValue={createPassword2}
          onChange={({ target: { value } }) => setCreatePassword2(value)}
        />
      </Grid>

      <Separation />

      {/* 제일 좋아하는 음식 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        제일 좋아하는 음식은 무엇인가요?
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Food"
          name="Food"
          label="음식 이름 : 예) 고등어순살조림"
          fullWidth
          defaultValue={createFavoriteFood}
          onChange={({ target: { value } }) => setCreateFavoriteFood(value)}
        />
      </Grid>
    </React.Fragment>
  );
};

/* styled-components */
// 회원정보 입력칸 사이 공백 컴포넌트
const Separation = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
`;

// 이메일 중복 체크 칸 컴포넌트
/*
  styled-components에 props 사용 시 type 지정을 해줘야 함
  StyledComponent type import 한 후 제네릭 4번째 인자에 props type 지정
*/
const EmailDuplicateCheck: StyledComponent<"div", any, {}, any> = styled.div`
  display: flex;
  ${(props: any) => {
    if (props.createEmailDuplicateCheck) {
      return css`
        color: green;
      `;
    } else {
      return css`
        color: red;
      `;
    }
  }}
`;

export default SignupUserInfoPage;
