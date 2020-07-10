import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import bearLogo from "../img/bear-logo-grey.png";
import "./AuthStyles.less";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import RegisterCodeComponent from "./RegisterCodeComponent";

interface Props {
  checkAuth: () => void;
}

const AuthRouter = (props: Props) => {
  return (
    <Layout className="auth-main">
      <div className="auth-header">
        <img className="auth-header-logo" src={bearLogo} alt="" />
        <span className="auth-header-text">Codeito</span>
      </div>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <LoginComponent {...props} />
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <RegisterComponent {...props} />
          )}
        />
        <Route
          exact
          path="/register/code"
          render={() => (
            <RegisterCodeComponent {...props} />
          )}
        />
        <Route path="*" render={() => <Redirect to={"/login"} />} />
      </Switch>
    </Layout>
  );
};

export default AuthRouter;
