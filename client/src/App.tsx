import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Spin, Dropdown } from "antd";
import "./App.less";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  NavLink,
} from "react-router-dom";
import Homecomponent from "./components/home/Homecomponent";
import ForumComponent from "./components/forum/ForumComponent";
import { LoadingOutlined, PhoneOutlined, LogoutOutlined } from "@ant-design/icons";
import AuthComponent from "./auth/AuthComponent";
import { apiRequest } from "./services/api-request";
import { ACCESS_TOKEN } from "./config/app-parameters";
import AppHeader from "./AppHeader";

interface PrivateRoute {
  component: React.FC;
  path: string;
}

const App = () => {
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
  }

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className={"app-loading"}>
        <Spin indicator={antIcon} className={"spin"} />
      </div>
    );
  }

  if (!isAuth && !loading) {
    return <AuthComponent checkAuth={checkAuth}></AuthComponent>;
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
    <div className="App">
      <Layout className="layout">
        <AppHeader logout={logout}></AppHeader>
        <Layout.Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Switch>
            <PrivateRoute path="/home" component={Homecomponent}></PrivateRoute>
            <PrivateRoute
              path="/forum"
              component={ForumComponent}
            ></PrivateRoute>
            <Route
              path="*"
              render={() => <Redirect to="/home"></Redirect>}
            ></Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default App;
