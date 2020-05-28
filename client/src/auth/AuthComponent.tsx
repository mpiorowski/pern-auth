import React from "react";
import { Layout } from "antd";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import "./AuthComponent.less";

interface Props {}

const AuthComponent = (props: Props) => {
  return (
    <Layout className="auth-main">
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => <LoginComponent {...props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <LoginComponent {...props} />}
        />
        <Route
          exact
          path="/register/code"
          render={(props) => <LoginComponent {...props} />}
        />
        <Route
          exact
          path="/recover"
          render={(props) => <LoginComponent {...props} />}
        />
        <Route
          exact
          path="/recover/code"
          render={(props) => <LoginComponent {...props} />}
        />
        <Route path="*" render={() => <Redirect to={"/login"} />} />
      </Switch>
    </Layout>
  );
};

export default AuthComponent;
