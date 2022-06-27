import { useEffect, useContext } from 'react';
import './index.css';
import { OrderContext } from '../../Context/OrderProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { Card, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import {
  DeleteOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import io from 'socket.io-client';
import { apiSocket } from '../../constants';

function OrderConfirm(props) {
  const {
    isInfoUsername: { isAuthentication },
  } = useContext(AuthContext);
  const {
    isDataOrder,
    setIsDataOrder,
    getDataOrder,
    deleteOrder,
    handleComplete,
    handleDelivery,
  } = useContext(OrderContext);
  useEffect(() => {
    if (isAuthentication) getDataOrder();
  }, [isAuthentication]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const socket = io(apiSocket);
    socket.on('add-order', newOrder => setIsDataOrder(newOrder));
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (text, object, index) => index + 1,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      align: 'center',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone',
      width: 150,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      align: 'center',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'method_payment',
      key: 'method_payment',
      width: 200,
      align: 'center',
    },
    {
      title: 'Hàng hóa',
      dataIndex: '',
      key: '',
      width: 350,
      render: value => (
        <div>
          {value.dataCarts?.map(item => {
            return (
              <div key={item._id}>
                <Tag color='#2db7f5'>
                  {item.title} - Màu:{item.color} - Size:{item.size} - Số lượng:
                  {item.quantity}
                </Tag>
              </div>
            );
          })}
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: '',
      render: value => {
        return (
          <div>
            {value.status === 'wait' ? (
              <Tag color='#f50'>Chờ xác nhận</Tag>
            ) : value.status === 'delivery' ? (
              <Tag color='#2db7f5'>Đang giao hàng</Tag>
            ) : (
              <Tag color='#87d068'>Hoàn thành</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'Quê quán',
      dataIndex: '',
      key: '',
      width: 300,
      render: value => (
        <div>
          {value.provinces}-{value.districts}-{value.wards}-{value.address}
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Thành tiền',
      dataIndex: '',
      key: '',
      width: 200,
      align: 'center',
      render: ({ intoMoney }) => (
        <div className='font-weight-bold'>
          {intoMoney.toLocaleString()}
          <sup>vnd</sup>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      fixed: 'right',
      width: 100,
      render: value => (
        <Space>
          <Tooltip
            title={
              value.status === 'wait'
                ? 'Xác nhận giao hàng'
                : value.status === 'delivery'
                ? 'Xác nhận hoàn thành'
                : null
            }
            placement='topLeft'
          >
            {value.status === 'wait' ? (
              <Popconfirm
                title='Are you sure to delete this task?'
                onConfirm={() =>
                  handleDelivery(value._id, { ...value, status: 'delivery' })
                }
                okText='Yes'
                cancelText='No'
              >
                <PlayCircleOutlined className='order-action' />
              </Popconfirm>
            ) : value.status === 'delivery' ? (
              <Popconfirm
                title='Are you sure to delete this task?'
                onConfirm={() =>
                  handleComplete(value._id, { ...value, status: 'complete' })
                }
                okText='Yes'
                cancelText='No'
              >
                <CheckOutlined className='order-action' />
              </Popconfirm>
            ) : null}
          </Tooltip>
          <Tooltip title='Hủy đơn hàng' placement='topLeft'>
            <Popconfirm
              title='Are you sure to delete this task?'
              onConfirm={() => deleteOrder(value._id)}
              okText='Yes'
              cancelText='No'
            >
              <DeleteOutlined className='order-action' />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
      align: 'center',
    },
  ];
  return (
    <div className='order-container'>
      <Card title='Đơn đặt hàng'>
        <Table
          columns={columns}
          dataSource={isDataOrder}
          size='small'
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
}

export default OrderConfirm;
