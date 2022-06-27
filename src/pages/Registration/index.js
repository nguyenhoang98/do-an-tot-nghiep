import { useContext, useEffect, useState } from 'react';
import './index.css';
import { AuthContext } from '../../Context/AuthProvider';
import { Button, Card, Form, Input, Space, Upload } from 'antd';
import {
  validateEmail,
  validateNumberPhone,
  validatePassword,
  validateUsername,
} from '../../common/validate';

function Registration(props) {
  const [form] = Form.useForm();
  const { register, isLoadingBtn } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const onChangeUpload = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = async () => {
    try {
      await register(form.getFieldsValue());
    } catch (error) {}
  };

  return (
    <Card title='Đăng Ký' className='register'>
      <Form
        name='form'
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete='off'
        labelAlign='left'
      >
        <Form.Item
          label='Tên tài khoản'
          name='userName'
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
          label='Mật khẩu'
          name='password'
          rules={[
            {
              required: true,
              validator: (_, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Số điện thoại'
          name='contactNumber'
          rules={[
            {
              required: true,
              validator: (_, value) => validateNumberPhone(value),
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, validator: (_, value) => validateEmail(value) },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Ảnh đại diện' name='profilePicture'>
          <Upload
            name='logo'
            listType='picture-card'
            fileList={fileList}
            onChange={onChangeUpload}
            maxCount={1}
            showUploadList={true}
          >
            +
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Space align='start'>
            <Button type='primary' htmlType='submit' loading={isLoadingBtn}>
              Đăng ký
            </Button>
            <Button type='primary' htmlType='reset' danger>
              Làm mới
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Registration;
