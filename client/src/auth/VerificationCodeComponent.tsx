import { KeyOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { openMessage, openNotification } from "../services/notifications";
import { serviceRecoverCode, serviceRegisterCode } from "./AuthApi";
import "./AuthStyles.less";

interface Props {
  checkAuth: () => void;
}

const VerificationCodeComponent: React.FC<Props> = () => {
  //
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (code: Store) => {
    setLoading(true);
    const locationData: Record<string, unknown> | null | undefined = history.location.state;

    if (locationData != null && locationData != undefined) {
      if (history.location.pathname == "/register/code" && "userEmail" in locationData) {
        const verificationData = {
          userEmail: locationData["userEmail"],
          code: code.code,
        };
        serviceRegisterCode(verificationData)
          .then((response) => {
            console.log(response);
            openMessage("User created", "success");
            history.push("/login");
          })
          .catch((error) => {
            console.log(error);
            if (error.code === 2) {
              openNotification(error.header, error.message, "error");
              setLoading(false);
            }
          });
      } else if (history.location.pathname == "/recover/code" && "userNameOrEmail" in locationData) {
        const verificationData = {
          userNameOrEmail: locationData["userNameOrEmail"],
          code: code.code,
          userPassword: code.userPassword,
        };
        serviceRecoverCode(verificationData)
          .then((response) => {
            console.log(response);
            openMessage("Password changed", "success");
            history.push("/login");
          })
          .catch((error) => {
            console.log(error);
            if (error.code === 2) {
              openNotification(error.header, error.message, "error");
              setLoading(false);
            }
          });
      }
    } else {
      // TODO - error if wrong data on site
    }
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
        name="code"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your verification code" }]}
      >
        <Input prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="Verification code" />
      </Form.Item>
      {history.location.pathname == "/recover/code" ? (
        <div>
          <Form.Item
            name="userPassword"
            hasFeedback
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please input your Password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New password"
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
                  return Promise.reject("The two passwords that you entered do not match!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Repeat password"
            />
          </Form.Item>
        </div>
      ) : (
        ""
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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

export default VerificationCodeComponent;
