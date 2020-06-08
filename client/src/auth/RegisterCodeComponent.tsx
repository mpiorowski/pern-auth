import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { serviceRegisterCode } from "./AuthApi";
import "./AuthStyles.less";

interface Props {
  checkAuth: () => void;
}

const RegisterCodeComponent = (props: Props) => {
  //
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (code: Store) => {
    setLoading(true);
    const userEmail: {} | null | undefined = history.location.state;
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
          history.push("/login");
        })
        .catch((error) => {
          console.error(error);
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
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Kod weryfikacyjny"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
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

export default RegisterCodeComponent;
