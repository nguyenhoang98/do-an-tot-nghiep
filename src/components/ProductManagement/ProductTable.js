import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Form,
  Image,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import { nanoid } from 'nanoid';

const { Option } = Select;

function ProductTable({
  dataProducts,
  payload,
  setPayload,
  deleteDataProduct,
  formCreate,
  setIsVisibleModal,
  dataCategories,
  setDiscount,
  fileList,
  setFileList,
}) {
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
            <Form.Item name='title'>
              <Input
                allowClear
                placeholder='Tên sản phẩm'
                onPressEnter={value => {
                  setPayload({ ...payload, title: value.target.value });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='category'>
              <Select
                allowClear
                placeholder='Thể loại'
                onChange={value => {
                  setPayload({ ...payload, category: value });
                }}
              >
                {dataCategories?.categoryList?.map(item => (
                  <Option value={item._id}> {item.name} </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='status'>
              <Select
                allowClear
                placeholder='Trạng thái'
                onChange={value => {
                  setPayload({ ...payload, status: value });
                }}
              >
                <Option value='stock'>Còn hàng</Option>
                <Option value='outStock'>Hết hàng</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      align: 'left',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
      align: 'left',
    },
    {
      title: 'Ảnh',
      dataIndex: '',
      key: '',
      align: 'left',
      render: ({ productAvatar }) => (
        <Image
          src={productAvatar[0]}
          style={{
            width: '50px',
            height: '50px',
          }}
        />
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: 'Trạng thái',
      dataIndex: '',
      key: '',
      align: 'left',
      render: ({ quantity, statusText }) => (
        <div>
          <Tag color={quantity ? '#87d068' : '#f50'}>{statusText}</Tag>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: '',
      key: '',
      align: 'left',
      render: ({ quantity }) => (
        <div style={{ fontWeight: 'bold' }}>{quantity.toLocaleString()}</div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: '',
      key: '',
      align: 'left',
      render: ({ price }) => (
        <div style={{ fontWeight: 'bold' }}>
          {price.toLocaleString()} vnd /1 chiếc
        </div>
      ),
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
            <EditOutlined
              style={{
                color: 'blue',
                cursor: 'pointer',
                marginRight: '10px',
              }}
              onClick={() => updateProduct(value)}
            />
            <Popconfirm
              title='Bạn có muốn xóa sản phẩm này?'
              onConfirm={() => deleteDataProduct(value._id)}
              okText='Yes'
              cancelText='No'
            >
              <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const updateProduct = data => {
    if (data.flashSale) setDiscount(false);
    formCreate.setFieldsValue({
      _id: data._id,
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      productAvatar: data.productAvatar,
      category: data.category,
      flashSale: data.flashSale,
      discount: data.discount,
      info: data.info,
    });
    if (data?.productAvatar) {
      setFileList(
        data?.productAvatar?.map(item => {
          return {
            url: item,
          };
        })
      );
    } else {
      setFileList([]);
    }
    setIsVisibleModal(true);
  };
  return (
    <div className='product-statistics'>
      <Card title='Danh sách sản phẩm'>
        <Table
          dataSource={dataProducts}
          columns={columns}
          size='small'
          rowKey={value => value._id}
          title={() => showGroupFilter()}
        />
      </Card>
    </div>
  );
}

export default ProductTable;
