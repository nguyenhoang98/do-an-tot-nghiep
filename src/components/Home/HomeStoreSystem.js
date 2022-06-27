import './HomeStoreSystem.css';
import { EnvironmentOutlined, ShopOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

function HomeStoreSystem(props) {
  return (
    <div className='HomeStoreSystem-container'>
      <Title level={5}>
        <ShopOutlined /> Hệ thống cửa hàng
      </Title>
      <Row gutter={8}>
        <Col span={12}>
          <div className='HomeStoreSystem-address'>
            <EnvironmentOutlined /> Số 46 Kim xuyên, Tân an, Yên dũng, Bắc giang
          </div>
          <div className='HomeStoreSystem-address'>
            <EnvironmentOutlined /> Số 68 Kim xuyên, Tân an, Yên dũng, Bắc giang
          </div>
          <div className='HomeStoreSystem-address'>
            <EnvironmentOutlined /> Số 66 Kim xuyên, Tân an, Yên dũng, Bắc giang
          </div>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}

export default HomeStoreSystem;
