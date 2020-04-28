import React from "react";
import styled from "styled-components";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

import LogoutButton from "../authentications/LogoutButton";

const Container = styled.div`
  height: 100%;
  background-color: green;
`;

function MainPage({ user, authenticated, logout }: any) {
  console.log("gdgdgd");
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
