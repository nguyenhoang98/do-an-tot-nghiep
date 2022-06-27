import { Button, Form, message, Modal, Popconfirm, Select, Space } from 'antd';
import authApi from '../../api/authApi';

const { Option } = Select;

function UserManagementUpdateModal({
  visible,
  setVisible,
  dataRow,
  form,
  getDataUser,
}) {
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onFinish = async () => {
    const { role } = form.getFieldValue();
    const data = {
      ...dataRow,
      role,
    };
    try {
      await authApi.updateUserRole(data._id, data);
      getDataUser();
      onCancel();
      message.success('Cập nhật user thành công');
    } catch (error) {}
  };
  return (
    <Modal
      title="Phân quyền"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form name="form" form={form} onFinish={onFinish}>
        <Form.Item name="role" rules={[{ required: true }]}>
          <Select placeholder="Chọn" allowClear>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Popconfirm
              title="Bạn có chắc chắn phần quyền cho người dùng này không?"
              onConfirm={onFinish}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Popconfirm>
            <Button htmlType="reset" danger onClick={onCancel}>
              Canel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserManagementUpdateModal;
