import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN } from "../config/app-parameters";
import { serviceLogIn } from "./AuthApi";
import "./AuthStyles.less";
import { openNotification } from "../services/notifications";
import { LogIn } from "../../../interfaces/AuthInterface";

interface Props {
  checkAuth: () => void;
}

const LoginComponent = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (credentials: Store) => {
    setLoading(true);
    const data: LogIn = {
      userNameOrEmail: credentials.userNameOrEmail,
      userPassword: credentials.userPassword,
    };
    serviceLogIn(data)
      .then((response: { authToken: string }) => {
        if (response.authToken) {
          localStorage.setItem(ACCESS_TOKEN, response.authToken);
          props.checkAuth();
        } else {
          openNotification("Something went wrong", "Please try again or wait some time.", "error");
        }
      })
      .catch((error) => {
        openNotification(error.header, error.message, "error");
        setLoading(false);
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
      layout={"vertical"}
    >
      <div style={{ height: 30 }}></div>
      <Form.Item
        name="userNameOrEmail"
        rules={[{ required: true, message: "Please input your Username or Email" }]}
        // required={false}
        // label={<div style={{ fontSize: 16 }}>Username or email</div>}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          // placeholder="Nazwa użytkownika lub email"
          placeholder="Username or email"
        />
      </Form.Item>
      <Form.Item
        name="userPassword"
        rules={[{ required: true, message: "Please input your Password" }]}
        // label={<div style={{ fontSize: 16 }}>Password</div>}
        // required={false}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="login-form-forgot">
        <NavLink to={"/recover"}>Forgot passoword?</NavLink>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Log in
        </Button>
        Or{" "}
        <NavLink to="/register">
          <b>register now.</b>
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginComponent;
