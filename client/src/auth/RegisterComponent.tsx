import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Register } from "../../../interfaces/AuthInterface";
import { serviceRegister } from "./AuthApi";
import "./AuthStyles.less";

interface Props {
  checkAuth: () => void;
}

const RegisterComponent = (props: Props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  //
  const onFinish = (credentials: Store) => {
    const data: Register = {
      userName: credentials.userName,
      userEmail: credentials.userEmail,
      userPassword: credentials.userPassword,
    };
    console.log("Received values of form: ", credentials);
    serviceRegister(data)
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((error) => {
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
      <Form.Item
        name="userName"
        hasFeedback
        // validateStatus={""}
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nazwa użytkownika"
        />
      </Form.Item>
      <Form.Item
        name="userEmail"
        hasFeedback
        validateTrigger="onBlur"
        // validateStatus={""}
        rules={[
          { required: true, message: "Please input your Password!" },
          { type: "email", message: "Niepoprawny format maila" },
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
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Hasło"
        />
      </Form.Item>
      <Form.Item
        name="repeatUserPassword"
        dependencies={["userPassword"]}
        hasFeedback
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Please input your Password!" },
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Dalej
        </Button>
        Masz już konto?
        <NavLink to="/login">
          <b> Zaloguj się.</b>
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default RegisterComponent;
