# SaySome

## SaySome Desktop Client.   
- - -
* 흐름도
<img src="https://user-images.githubusercontent.com/52199223/82762655-348beb00-9e3d-11ea-8694-f72eacdfffb2.PNG"><img>   
- - -
* 빌드 버전 기록   
  * Node version : 12.13.0   
  * Electron version : 8.2.3   
  * Chromium version : 80.0.3987.163   
- - -
* 사용 모듈
  * Electron
  * React
  * TypeScript
  * GraphQL
  * Apollo
  * styled-components
  * Material-UI
  * axios
  * dotenv
  * Jest
- - -
* clone 후 해야 할 일   
  * npm i
  * yarn install
  * .env, .env.development, .env.production 초기화 (파일명에서 fake_ 지울 것.)
- - -
* Error Code
  * 1 : 로그인 API 에러
    + 코드 위치 : src/authentications/AuthRequest.ts
    + 가능 원인 : API 서버 다운 (데이터베이스 서버는 알 수 없음)
  * 2 : 로그인 API 에러
    + 코드 위치 : src/authentications/AuthRequest.ts
    + 가능 원인 : 데어터베이스 서버 다운
  * 3 : 이메일 중복체크 API 에러
    + 코드 위치 : src/pages/signup_pages/signupControlPage.tsx
    + 가능 원인 : API 서버 다운 (데이터베이스 서버는 알 수 없음)
  * 4 : 이메일 중복체크 API 에러
    + 코드 위치 : src/pages/signup_pages/signupControlPage.tsx
    + 가능 원인 : 데이터베이스 서버 다운
  * 5 : 회원가입 신청 API 에러
    + 코드 위치 : src/pages/signup_pages/signupControlPage.tsx
    + 가능 원인 : API 서버 다운 (데이터베이스 서버는 알 수 없음)
  * 6 : 회원가입 신청 API 에러
    + 코드 위치 : src/pages/signup_pages/signupControlPage.tsx
    + 가능 원인 : 데이터베이스 서버 다운
  * 7 : 회원가입 신청 API 에러
    + 코드 위치 : src/pages/signup_pages/signupControlPage.tsx
    + 가능 원인 : 데이터베이스 내부 에러 (INSERT 쿼리가 비정상적으로 수행됨.)
