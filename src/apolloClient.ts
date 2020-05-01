import ApolloClient from "apollo-boost";

// import dotenv
import dotenv from "dotenv";

// import .env
dotenv.config();

// 아폴로 클라이언트 생성
const client: any = new ApolloClient({
  uri: process.env.REACT_APP_saysome_server,
});

export default client;
