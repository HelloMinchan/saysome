import React from "react";

// import authentications
import LogoutButton from "../authentications/LogoutButton";
import { UserInfo } from "../authentications/AuthRequest";

interface MainPageProps {
  user: UserInfo | null;
  logout: Function;
}

function MainPage({ user, logout }: MainPageProps) {
  const { name, food } = user || {};
  return (
    <>
      <h1>
        안녕 내이름은 {name}이고 {food}를 제일 좋아해 히힛!
      </h1>

      <LogoutButton logout={logout} />
    </>
  );
}

export default MainPage;
