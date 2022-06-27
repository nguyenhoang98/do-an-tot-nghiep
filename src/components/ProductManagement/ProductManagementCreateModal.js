import { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Button,
  Space,
  Upload,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

function ProductManagementCreateModal({
  formCreate,
  isVisibleModal,
  setIsVisibleModal,
  createDataProduct,
  updateDataProduct,
  dataCategories,
  discount,
  setDiscount,
  fileList,
  setFileList,
  isLoadingBtn,
}) {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onCloseModal = () => {
    formCreate.resetFields();
    setDiscount(true);
    setFileList([]);
    setIsVisibleModal(false);
  };
  const onFinish = async () => {
    const data = {
      ...formCreate.getFieldValue(),
    };
    let response;
    try {
      if (!data._id) {
        response = await createDataProduct(data);
      } else {
        response = await updateDataProduct(data);
      }
      if (response.data.success) onCloseModal();
    } catch (error) {
      setIsVisibleModal(true);
    }
  };
  return (
    <Modal
      title="Tạo sản phẩm"
      visible={isVisibleModal}
      onCancel={onCloseModal}
      footer={null}
      width={1000}
    >
      <Form
        name="formCreate"
        form={formCreate}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          _id: "",
          title: "",
          description: "",
          price: "",
          productAvatar: "",
          category: "",
          flashSale: false,
          discount: "",
        }}
        onFinish={onFinish}
        autoComplete="off"
        labelAlign="left"
      >
        <Row
          gutter={16}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Col span={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thể loại"
              name="category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Lựa chọn">
                {dataCategories?.categoryList?.map(item => (
                  <Option value={item._id}> {item.name} </Option>
                ))}
              </Select>
            </Form.Item>
            {/* sửa */}
            <Form.List
              name="info"
              label="Chi tiết"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={8}>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          rules={[{ required: true, message: "Bắt buộc" }]}
                          label="Màu"
                        >
                          <Input placeholder="color" />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          rules={[{ required: true, message: "Bắt buộc" }]}
                          label="Size"
                        >
                          <Input placeholder="size" />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          name={[name, "quantity"]}
                          rules={[{ required: true, message: "Bắt buộc" }]}
                          label="SL"
                        >
                          <InputNumber placeholder="quantity" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item label="Thêm chi tiết" rules={[{ required: true }]}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Giảm giá" name="flashSale">
              <Select
                placeholder="Lựa chọn"
                onChange={value => {
                  setDiscount(!value);
                  if (!value) {
                    formCreate.setFieldsValue({ discount: "" });
                  }
                }}
              >
                <Option value={true}>Có</Option>
                <Option value={false}>Không</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phần trăm giảm giá"
              name="discount"
              rules={[{ required: !discount }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                disabled={discount}
                placeholder="Phần trăm"
              />
            </Form.Item>
            <Form.Item
              label="Upload ảnh"
              name="productAvatar"
              rules={[{ required: true }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                maxCount={5}
                onChange={onChange}
                showUploadList={true}
              >
                +
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          style={{
            textAlign: "end",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoadingBtn}>
              Tạo mới
            </Button>
            <Button
              danger
              type="reset"
              onClick={() => formCreate.resetFields()}
            >
              Làm mới
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProductManagementCreateModal;
