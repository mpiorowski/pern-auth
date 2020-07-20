import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { openMessage, openNotification } from "../services/notifications";
import { serviceRegisterCode } from "./AuthApi";
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
    const userEmail: Record<string, unknown> | null | undefined =
      history.location.state;
    if (
      userEmail !== null &&
      userEmail !== undefined &&
      "userEmail" in userEmail
    ) {
      const credentials = {
        userEmail: userEmail["userEmail"],
        code: code.code,
      };
      serviceRegisterCode(credentials)
        .then((response) => {
          console.log(response);
          openMessage("User created", "success");
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 2) {
            openNotification(
              "Incorrect code",
              "Submited code is incorrect. Please check again.",
              "error"
            );
            setLoading(false);
          }
        });
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Verification code"
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

export default VerificationCodeComponent;
