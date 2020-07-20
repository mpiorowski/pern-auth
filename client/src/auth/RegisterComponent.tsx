import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Register } from "../../../interfaces/AuthInterface";
import { serviceRegister } from "./AuthApi";
import "./AuthStyles.less";
import { openNotification } from "../services/notifications";

interface Props {
  checkAuth: () => void;
}

const RegisterComponent = (props: Props) => {
  //
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (credentials: Store) => {
    setLoading(true);
    const data: Register = {
      userName: credentials.userName,
      userEmail: credentials.userEmail,
      userPassword: credentials.userPassword,
    };
    serviceRegister(data)
      .then(() => {
        history.push({
          pathname: "/register/code",
          state: { userEmail: credentials.userEmail },
        });
      })
      .catch((error) => {
        openNotification(error.header, error.message, "error");
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size={"large"}
      scrollToFirstError
    >
      <div style={{height:30}}></div>
      <Form.Item
        name="userName"
        hasFeedback
        // validateStatus={""}
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your Username" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="userEmail"
        hasFeedback
        validateTrigger="onBlur"
        // validateStatus={""}
        rules={[
          { required: true, message: "Please input your Email" },
          { type: "email", message: "Incorrect Email input" },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          // type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="userPassword"
        hasFeedback
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your Password" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="repeatUserPassword"
        dependencies={["userPassword"]}
        hasFeedback
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Please input your Password" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("userPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Powtórz hasło"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Continue
        </Button>
        Already have an account?
        <NavLink to="/login">
          <b> Log in.</b>
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default RegisterComponent;
