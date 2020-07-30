import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { openNotification } from "../services/notifications";
import { serviceRecover } from "./AuthApi";
import "./AuthStyles.less";

interface Props {
  checkAuth: () => void;
}

const RecoverComponent = (props: Props) => {
  //
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (formData: Store) => {
    setLoading(true);
    const data: { userNameOrEmail: string } = {
      userNameOrEmail: formData.userNameOrEmail,
    };
    serviceRecover(data)
      .then(() => {
        openNotification("Verification code sent", "A verification code has been sent to the email address.", "success");
        history.push({
          pathname: "/recover/code",
          state: { userNameOrEmail: formData.userNameOrEmail },
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
      layout={"vertical"}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size={"large"}
      scrollToFirstError
    >
      <div style={{ height: 30 }}>Please input Your username or email for recovery code</div>
      <Form.Item
        name="userNameOrEmail"
        // hasFeedback
        // validateStatus={""}
        validateTrigger="onBlur"
        rules={[{ required: true, message: "Please input your username or email" }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Continue
        </Button>
        Back to the
        <NavLink to="/login">
          <b> login page.</b>
        </NavLink>
      </Form.Item>
    </Form>
  );
};

export default RecoverComponent;
