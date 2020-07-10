import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import "./App.less";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AuthRouter from "./auth/AuthRouter";
import ForumComponent from "./components/forum/ForumComponent";
import Homecomponent from "./components/home/Homecomponent";
import { ACCESS_TOKEN } from "./config/app-parameters";
import { apiRequest } from "./services/api-request";
import Productcomponent from "./components/product/Productcomponent";

interface PrivateRoute {
  component: React.FC;
  path: string;
}

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setLoading(true);
    apiRequest({
      url: "/api/auth/user",
      method: "GET",
    })
      .then((user) => {
        if (user.userName) {
          setIsAuth(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        // TODO: error
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.setItem(ACCESS_TOKEN, "");
    setIsAuth(false);
  };

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className="app-loading">
        <Spin indicator={antIcon} className="spin" />
      </div>
    );
  }

  if (!isAuth && !loading) {
    return <AuthRouter checkAuth={checkAuth} />;
  }

  const PrivateRoute = ({ component, path, ...rest }: PrivateRoute) => {
    const routeComponent = (props: any) =>
      isAuth ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      );
    return <Route {...rest} path={path} render={routeComponent} />;
  };

  return (
    <div className="app">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <AppSider />
          <Layout>
            <AppHeader logout={logout} />
            <Layout.Content style={{ padding: "0 50px" }} className={"app-content"}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
              </Breadcrumb>
              <Switch>
                <PrivateRoute path="/home" component={Homecomponent} />
                <PrivateRoute path="/forum" component={ForumComponent} />
                <PrivateRoute path="/product" component={Productcomponent} />
                <Route path="*" render={() => <Redirect to="/product" />} />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
