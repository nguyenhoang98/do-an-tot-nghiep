import { useState, useEffect, useContext } from 'react';
import './index.css';
import { CartContext } from '../../Context/CartsProvider';
import orderApi from '../../api/orderApi';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Select,
  Radio,
  Button,
  Space,
  message,
} from 'antd';
import { validateEmail, validateNumberPhone } from '../../common/validate';
import optionApi from '../../api/optionApi';

const { Option } = Select;

function Payment(props) {
  const navigate = useNavigate();
  const { dataCarts, getDataCarts } = useContext(CartContext);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [dataProvinces, setDataProvinces] = useState(null);
  const [province_code, setProvince_code] = useState(null);
  const [dataDistrict, setDataDistrict] = useState(null);
  const [district_code, setDistrict_code] = useState(null);
  const [dataWard, setDataWard] = useState(null);
  const [formPayment] = Form.useForm();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    (async () => {
      const response = await optionApi.provincesApi();
      setDataProvinces(response.data.provinces);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await optionApi.districtsApi(province_code);
      setDataDistrict(response.data.district);
    })();
  }, [province_code]);
  useEffect(() => {
    (async () => {
      const response = await optionApi.wardsApi(district_code);
      setDataWard(response.data.ward);
    })();
  }, [district_code]);
  const onChangeProvinces = value => {
    setProvince_code(value);
  };
  const onChangeDistrict = value => {
    setDistrict_code(value);
  };
  const onFinish = async () => {
    const dataForm = formPayment.getFieldValue();
    try {
      setIsBtnLoading(true);
      await orderApi.postDataOrderHistory({ dataCarts });
      await orderApi.postDataOrder({ ...dataForm, dataCarts });
      message.success(
        'Đặt hàng thành công.Bạn hãy check lại mail của chúng tôi'
      );
      formPayment.resetFields();
      navigate('/');
      getDataCarts();
    } catch (error) {
    } finally {
      setIsBtnLoading(false);
    }
  };
  return (
    <Card title='Thanh toán' className='Payment-content'>
      <Form
        name='payment'
        form={formPayment}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='left'
        onFinish={onFinish}
        initialValues={{
          name: '',
          numberPhone: '',
          email: '',
          address: '',
          provinces: '',
          districts: '',
          wards: '',
          method_payment: 'offline',
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Họ và tên'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='numberPhone'
              label='Số điện thoại'
              rules={[
                {
                  required: true,
                  validator: (_, value) => validateNumberPhone(value),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  validator: (_, value) => validateEmail(value),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='address'
              label='Địa chỉ'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name='provinces'
              label='Tỉnh'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={onChangeProvinces} allowClear>
                {dataProvinces &&
                  dataProvinces.map(item => {
                    return (
                      <Option value={item.code} key={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='districts'
              label='Huyện'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select onChange={onChangeDistrict} allowClear>
                {dataDistrict &&
                  dataDistrict.map(item => {
                    return (
                      <Option value={item.code} key={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='wards'
              label='Xã'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select allowClear>
                {dataWard &&
                  dataWard.map(item => {
                    return (
                      <Option value={item.code} key={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Form.Item
            name='method_payment'
            label='Phương thức thanh toán'
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
          >
            <Radio.Group>
              <Radio value='offline'>Thanh toán khi nhận hàng</Radio>
              <Radio value='online' disabled>
                Thanh toán trực tuyến
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Row>
        <Row gutter={16}>
          <Col span={12} offset={12} className='flex-end'>
            <Space>
              <Button type='primary' htmlType='submit' loading={isBtnLoading}>
                Xác nhận
              </Button>
              <Button
                danger
                type='reset'
                onClick={() => formPayment.resetFields()}
              >
                Làm mới
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default Payment;
