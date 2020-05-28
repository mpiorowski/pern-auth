import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Spin } from "antd";
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
import { LoadingOutlined } from "@ant-design/icons";
import AuthComponent from "./auth/AuthComponent";

interface PrivateRoute {
  component: React.FC;
  path: string;
}

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className={"app-loading"}>
        <Spin indicator={antIcon} className={"spin"} />
      </div>
    );
  }

  const handleAuth = () => {
    
  }

  if (!isAuth && !loading) {
    return <AuthComponent></AuthComponent>;
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
        <Layout.Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="/home">
              <NavLink to="/home">HOME</NavLink>
            </Menu.Item>
            <Menu.Item key="/forum">
              <NavLink to="/forum">FORUM</NavLink>
            </Menu.Item>
          </Menu>
        </Layout.Header>
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
