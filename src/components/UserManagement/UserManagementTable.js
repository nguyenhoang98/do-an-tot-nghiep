import { nanoid } from 'nanoid';
import authApi from '../../api/authApi';
import {
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

function UserManagementTable({
  dataListUser,
  getDataUser,
  setVisible,
  setDataRow,
  form,
  payload,
  setPayload,
}) {
  const deleteUser = async data => {
    try {
      await authApi.deleteUser(data._id);
      message.success('Xóa user thành công');
      getDataUser();
    } catch (error) {}
  };
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      align: '',
      render: (text, value, index) => index + 1,
    },
    {
      title: 'Tên người dùng',
      dataIndex: '',
      key: '',
      align: 'left',
      render: ({ userName }) => (
        <div style={{ fontWeight: 'bold' }}> {userName} </div>
      ),
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
      align: 'left',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: '',
      align: 'right',
      width: 100,
      render: value => {
        return (
          <Space size={[6, 6]}>
            <Tooltip title="Phân quyền">
              <EditOutlined
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
                onClick={() => {
                  setVisible(true);
                  setDataRow(value);
                  form.setFieldsValue({ role: value.role });
                }}
              />
            </Tooltip>
            <Popconfirm
              title="Bạn có muốn xóa sản phẩm này?"
              onConfirm={() => deleteUser(value)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const showGroupFilter = () => {
    return (
      <Form>
        <Row
          gutter={8}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Col span={4}>
            <Form.Item name="userName">
              <Input
                placeholder="Tên người dùng"
                onPressEnter={e =>
                  setPayload({ ...payload, userName: e.target.value })
                }
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <InputNumber
                placeholder="Số điện thoại"
                style={{
                  width: '100%',
                }}
                onPressEnter={e =>
                  setPayload({ ...payload, contactNumber: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select
                placeholder="Role"
                onChange={value => setPayload({ ...payload, role: value })}
                allowClear
              >
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Table
      dataSource={dataListUser}
      columns={columns}
      size="small"
      rowKey={value => value._id}
      title={() => showGroupFilter()}
    />
  );
}

export default UserManagementTable;
