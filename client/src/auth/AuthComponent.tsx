import React from "react";
import { Layout } from "antd";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import "./AuthComponent.less";

interface Props {
  checkAuth: () => void
}

const AuthComponent = (props: Props) => {
  return (
    <Layout className="auth-main">
      <Switch>
        <Route
          exact
          path="/login"
          render={(props2) => (
            <LoginComponent checkAuth={props.checkAuth} {...props2} />
          )}
        />
        <Route path="*" render={() => <Redirect to={"/login"} />} />
      </Switch>
    </Layout>
  );
};

export default AuthComponent;
