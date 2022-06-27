import { CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

function ProductPolicy(props) {
  return (
    <div
      style={{
        margin: '50px 0px',
      }}
    >
      <Title style={{ fontSize: '24px' }}> Chính sách của shop </Title>
      <div className="productDetail-horizontal-content">
        <CheckOutlined /> 7 ngày miễn phí trả hàng
      </div>
      <div className="productDetail-horizontal-content">
        <CheckOutlined /> Hàng chính hãng 100%
      </div>
      <div className="productDetail-horizontal-content">
        <CheckOutlined /> Miễn phí vận chuyển với đơn hàng trên 500.000 nghìn
        đồng
      </div>
    </div>
  );
}

export default ProductPolicy;
