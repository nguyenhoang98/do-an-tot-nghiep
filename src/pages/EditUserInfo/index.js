import { useContext, useState, useEffect } from 'react';
import './index.css';
import { AuthContext } from '../../Context/AuthProvider';
import { Button, Card, Form, Input, Space, Upload } from 'antd';
import {
  validateEmail,
  validateNumberPhone,
  validateUsername,
  validateEditPassword,
} from '../../common/validate';

function EditUserInfo(props) {
  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(true);
  const {
    isLoadingBtn,
    isInfoUsername: { username },
    editUser,
  } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);

  const onChangeUpload = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async () => {
    try {
      await editUser(form.getFieldsValue());
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    if (username) {
      form.setFieldsValue({
        userName: username?.userName,
        contactNumber: username?.contactNumber,
        email: username?.email,
        profilePicture: username?.profilePicture,
      });
      if (username?.profilePicture)
        setFileList([
          {
            ...fileList,
            url: username?.profilePicture,
          },
        ]);
      else setFileList([]);
    }
  }, [username]);
  return (
    <Card title='Chỉnh sửa thông tin' className='edit-userInfo'>
      <Form
        name='form'
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete='off'
        labelAlign='left'
        initialValues={{
          userName: username?.userName,
          contactNumber: username?.contactNumber,
          email: username?.email,
          profilePicture: username?.profilePicture,
        }}
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
          <Input disabled />
        </Form.Item>

        <Form.Item
          label='Mật khẩu cũ'
          name='oldPassword'
          rules={[
            {
              validator: (_, value) => validateEditPassword(value),
            },
          ]}
        >
          <Input.Password
            onChange={e => {
              if (e.target.value.trim()) {
                setIsDisable(false);
              } else {
                setIsDisable(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label='Mật khẩu mới'
          name='newPassword'
          rules={[
            {
              required: form.getFieldValue('oldPassword')?.trim()
                ? true
                : false,
              validator: (_, value) => validateEditPassword(value),
            },
          ]}
        >
          <Input.Password disabled={isDisable} />
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
              Cập nhật
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

export default EditUserInfo;
