import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

// import authentications
import LogoutButton from "../authentications/LogoutButton";
import { UserInfo } from "../authentications/AuthRequest";

const Container = styled.div`
  height: 100%;
  background-color: green;
`;

interface MainPageProps {
  user: UserInfo | null;
  authenticated: boolean;
  logout: Function;
}

function MainPage({ user, authenticated, logout }: MainPageProps) {
  const { email, password, name } = user || {};
  return (
    <>
      <h1>Profile</h1>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
      <div>
        {authenticated ? (
          <LogoutButton logout={logout} />
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default MainPage;
