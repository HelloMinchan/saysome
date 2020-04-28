import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import AuthRoute from "./authentications/AuthRoute";
import { signIn, UserInfoForLoginRequest } from "./authentications/AuthRequest";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/Errorpage";

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login: object = ({ email, password }: UserInfoForLoginRequest): any =>
    setUser(signIn({ email, password }));
  const logout: object = (): void => setUser(null);

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <LoginPage authenticated={authenticated} login={login} {...props} />
          )}
        />

        <AuthRoute
          authenticated={authenticated}
          exact
          path="/"
          render={(props: any): any => (
            <MainPage
              user={user}
              authenticated={authenticated}
              logout={logout}
            />
          )}
        />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
