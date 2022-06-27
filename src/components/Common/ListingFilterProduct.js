import { useContext } from 'react';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { Form, Select, Row, Col } from 'antd';

const { Option } = Select;

function ListingFilterProduct(props) {
  const { payload, setPayload } = useContext(ProductManagementContext);
  const [formSort] = Form.useForm();
  const onSortPrice = value => {
    setPayload({ ...payload, sortPrice: Number(value) });
  };
  const onSortName = value => {
    setPayload({ ...payload, sortName: value });
  };
  return (
    <Form name='formSort' form={formSort}>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name='value' label='Giá'>
            <Select allowClear placeholder='Lựa chọn' onChange={onSortPrice}>
              <Option value={1}> Giá tăng dần </Option>
              <Option value={-1}> Giá giảm dần </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='name' label='Tên'>
            <Select allowClear placeholder='Lựa chọn' onChange={onSortName}>
              <Option value='asc'> A-Z </Option>
              <Option value='desc'> Z-A </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ListingFilterProduct;
