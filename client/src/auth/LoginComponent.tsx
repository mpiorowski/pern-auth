import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN } from "../config/app-parameters";
import { serviceLogIn } from "./AuthApi";
import "./AuthStyles.less";

interface Props {
  checkAuth: () => void;
}

const LoginComponent = (props: Props) => {
  const onFinish = (credentials: Store) => {
    console.log("Received values of form: ", credentials);
    serviceLogIn(credentials)
      .then((response: { authToken: string }) => {
        if (response.authToken) {
          localStorage.setItem(ACCESS_TOKEN, response.authToken);
          props.checkAuth();
        } else {
          // TODO: - error
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
        name="userNameOrEmail"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nazwa użytkownika lub email"
        />
      </Form.Item>
      <Form.Item
        name="userPassword"
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
