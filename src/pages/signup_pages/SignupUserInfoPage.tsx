import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import styled from "styled-components";

/***************************************************************************************
                              SignupUserInfoPage 컴포넌트
                              Arguments : createName,
                                          createEmail,
                                          createPassword1,
                                          createPassword2,
                                          createFavoriteFood,
                                          setCreateName,
                                          setCreateEmail,
                                          setCreatePassword1,
                                          setCreatePassword2,
                                          setCreateFavoriteFood,
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.21
***************************************************************************************/
const SignupUserInfoPage: React.FC<any> = ({
  createName,
  createEmail,
  createPassword1,
  createPassword2,
  createFavoriteFood,
  setCreateName,
  setCreateEmail,
  setCreatePassword1,
  setCreatePassword2,
  setCreateFavoriteFood,
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

      {/* 비밀번호 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        비밀번호를 입력해 주세요.
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Password1"
          name="Password1"
          label="비밀번호 : 예) 1q2w3e4r!"
          fullWidth
          autoComplete="billing address-level2"
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
          label="비밀번호 확인 : 예) 1q2w3e4r!"
          fullWidth
          autoComplete="billing address-level2"
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

export default SignupUserInfoPage;
