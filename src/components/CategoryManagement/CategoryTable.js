import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, Table, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function CategoryTable({
  dataCategories,
  getDataCategory,
  deleteDataCategory,
  formCreateCategory,
  setIsVisibleCategoryModal,
}) {
  const updateDataCategory = value => {
    console.log('value', value);
    setIsVisibleCategoryModal(true);
    formCreateCategory.setFieldsValue({
      id: value._id,
      name: value.name,
    });
  };

  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      width: 150,
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Thể loại',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: '',
      key: '',
      render: ({ createdAt }) => (
        <div>{dayjs(createdAt).format('DD/MM/YYYY')}</div>
      ),
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: '',
      key: '',
      render: ({ updatedAt }) => (
        <div> {dayjs(updatedAt).format('DD/MM/YYYY')} </div>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: '',
      width: 150,
      align: 'center',
      render: value => {
        return (
          <Space size={[6, 6]}>
            <EditOutlined
              style={{
                color: 'blue',
                cursor: 'pointer',
                marginRight: '10px',
              }}
              onClick={() => updateDataCategory(value)}
            />
            <Popconfirm
              title="Bạn có muốn xóa thể loại này không?"
              onConfirm={() => deleteDataCategory(value._id)}
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
  useEffect(() => {
    getDataCategory();
  }, []);
  return (
    <Card title="Danh sách thể loại">
      <Table
        dataSource={dataCategories?.categoryList}
        columns={columns}
        size="small"
        rowKey={value => value._id}
      />
    </Card>
  );
}

export default CategoryTable;
