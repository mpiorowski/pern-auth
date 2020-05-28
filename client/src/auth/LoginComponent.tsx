import React from "react";
import { Input, Checkbox, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./AuthComponent.less";
import { NavLink, Redirect } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { serviceLogIn } from "./AuthServices";
import { ACCESS_TOKEN } from "../config/app-parameters";

interface Props {}

const LoginComponent = (props: Props) => {
  const onFinish = (credentials: Store) => {
    console.log("Received values of form: ", credentials);
    serviceLogIn(credentials)
      .then((response: { authToken: string }) => {
        if (response.authToken) {
          localStorage.setItem(ACCESS_TOKEN, response.authToken);
          return <Redirect to="/" />;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size={"large"}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="login-form-forgot">
        <NavLink to={"/recover"}>Nie pamiętasz hasła?</NavLink>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Zaloguj się
        </Button>
        Lub{" "}
        <NavLink to="/register">
          <b>załóż nowe konto.</b>
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginComponent;
