import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

/* Material-UI useStyle */
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
  },
}));

/***************************************************************************************
                              SignupReviewPage 컴포넌트
                              Arguments : createName,
                                          createEmail,
                                          createPassword1,
                                          createFavoriteFood,
                                          provisionAcceptCheck,
                                          setProvisionAcceptCheck,
                                          emailReceptionAcceptCheck,
                                          setEmailReceptionAcceptCheck
                              Return : FunctionComponent
                              마지막 수정 : 2020.05.21
***************************************************************************************/
const SignupReviewPage: React.FC<any> = ({
  createName,
  createEmail,
  createPassword1,
  createFavoriteFood,
  provisionAcceptCheck,
  setProvisionAcceptCheck,
  emailReceptionAcceptCheck,
  setEmailReceptionAcceptCheck,
}) => {
  // useStyle Call
  const classes: any = useStyles();

  // 개발자 정보
  const developerInfo: Array<string> = [
    "wjdalscksdle@gmail.com",
    "https://hellominchan.tistory.com",
    "HelloMinchn",
    "24",
    "Korea",
  ];

  // 가입자 정보
  const signupInfo: Array<any> = [
    { category: "이름", description: createName },
    { category: "이메일", description: createEmail },
    { category: "비밀번호", description: createPassword1 },
    { category: "좋아하는 음식", description: createFavoriteFood },
  ];

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom className={classes.title}>
        SaySome 이용약관
      </Typography>

      <Provision>
        (주) SaySome은 HelloMinchan이 만들었으며, 어쩌고저쩌고이다. 법적 효력을
        가진척해 보고 싶어서 작성하는 중입니다람쥐. 물론 MIT License이므로, 절대
        무단 수정 및 배포 모두 상관없지롱 ~_~ 다만, GitHub에 스타 정돈 눌러줄 수
        있잖아? 아님 인스타 팔로우라도 해주던가...
      </Provision>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            개발자 정보
          </Typography>
          <Typography gutterBottom>정민찬</Typography>
          <Typography gutterBottom>{developerInfo.join(", ")}</Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            가입자 정보
          </Typography>

          <Grid container>
            {signupInfo.map((information) => (
              <React.Fragment key={information.category}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{information.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom style={{ wordBreak: "break-all" }}>
                    {information.description}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Separation />

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="saveAddress"
              value="provisionAccept"
              onChange={() => setProvisionAcceptCheck(!provisionAcceptCheck)}
            />
          }
          label="SaySome 이용약관을 확인하였고 동의합니다. (필수 사항)"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name="saveAddress"
              value="emailReceptionAccept"
              onChange={() =>
                setEmailReceptionAcceptCheck(!emailReceptionAcceptCheck)
              }
            />
          }
          label="SaySome에 관한 업데이트 소식을 이메일로 받겠습니다. (선택 사항)"
        />
      </Grid>
    </React.Fragment>
  );
};

/* styled-components */
// 이용약관 컴포넌트
const Provision = styled.div``;

// 이용약관과 체크박스 사이 공백 컴포넌트
const Separation = styled.div`
  border-top: 1px dashed black;
  margin-top: 30px;
  padding-bottom: 30px;
`;

export default SignupReviewPage;
