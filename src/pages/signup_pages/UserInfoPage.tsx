import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import styled from "styled-components";

// import globalData
import { loginButtonColor } from "../../globalData";

export default function UserInfoPage() {
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
        />
      </Grid>

      <Separation></Separation>

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
        />
      </Grid>

      <Separation></Separation>

      {/* 비밀번호 기입란 */}
      <Typography variant="h6" gutterBottom style={{ marginBottom: "-3px" }}>
        비밀번호를 입력해 주세요.
      </Typography>
      <Grid item xs={6}>
        <TextField
          required
          id="Password"
          name="Password"
          label="비밀번호 : 예) 1q2w3e4r!"
          fullWidth
          autoComplete="billing address-level2"
        />
      </Grid>

      <Separation></Separation>

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
        />
      </Grid>

      <Separation></Separation>

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
        />
      </Grid>
    </React.Fragment>
  );
}

const Separation = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
`;
