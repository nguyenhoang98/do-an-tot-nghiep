import { useContext, useEffect } from "react";
import "./index.css";
import { AuthContext } from "../../Context/AuthProvider";
import { Button, Card, Form, Input, Space } from "antd";
import { validatePassword, validateUsername } from "../../common/validate";

function Login(props) {
  const [form] = Form.useForm();
  const { login, isLoadingBtn } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const onFinish = async () => {
    try {
      await login(form.getFieldsValue());
    } catch (error) {}
  };
  return (
    <Card title="Đăng nhập" className="register">
      <Form
        name="form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item
          label="Tên tài khoản"
          name="userName"
          rules={[
            {
              required: true,
              validator: (_, value) => validateUsername(value),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              validator: (_, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space align="start">
            <Button type="primary" htmlType="submit" loading={isLoadingBtn}>
              Đăng nhập
            </Button>
            <Button type="primary" htmlType="reset" danger>
              Làm mới
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
