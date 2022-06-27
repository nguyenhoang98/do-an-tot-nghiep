import { useContext } from 'react';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { Form, Typography, Radio, Button, Popconfirm } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const { Title } = Typography;

function ProductRating({ idProduct }) {
  const { ratingProduct, isLoadingBtn } = useContext(ProductManagementContext);
  const [formRadioRating] = Form.useForm();
  const onFinish = () => {
    console.log(formRadioRating.getFieldsValue());
    ratingProduct(formRadioRating.getFieldsValue(), idProduct);
  };
  return (
    <div style={{ margin: '20px 0px' }}>
      <Title level={5}>Đánh giá sản phẩm</Title>
      <Form
        name='formRadioRating'
        form={formRadioRating}
        onFinish={onFinish}
        initialValues={{
          rating: 5,
        }}
      >
        <Form.Item name='rating'>
          <Radio.Group name='radiogroup'>
            <Radio value={1}>
              <StarOutlined />
            </Radio>
            <Radio value={2}>
              <StarOutlined />
              <StarOutlined />
            </Radio>
            <Radio value={3}>
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </Radio>
            <Radio value={4}>
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </Radio>
            <Radio value={5}>
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Popconfirm
          title='Bạn có muốn gửi đánh giá?'
          onConfirm={onFinish}
          okText='Yes'
          cancelText='No'
        >
          <Button type='primary' htmlType='submit' loading={isLoadingBtn}>
            Gửi
          </Button>
        </Popconfirm>
      </Form>
    </div>
  );
}

export default ProductRating;
