import { Button, Form, Input, Modal, Space } from 'antd';

function CategoryModal({
  isLoadingBtn,
  isVisibleCategoryModal,
  setIsVisibleCategoryModal,
  formCreateCategory,
  createDataCategory,
  updateDataCategory,
}) {
  const onFinish = () => {
    const data = formCreateCategory.getFieldValue();
    console.log('data', data);
    if (!data.id) {
      createDataCategory(data);
    } else {
      updateDataCategory(data);
    }
    onCancel();
  };
  const onCancel = () => {
    setIsVisibleCategoryModal(false);
    formCreateCategory.resetFields();
  };
  return (
    <Modal
      visible={isVisibleCategoryModal}
      title="Thêm thể loại"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        name="formCreateCategory"
        form={formCreateCategory}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ id: '', name: '' }}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Form.Item
          label="Tên thể loại"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Space
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadingBtn}>
              Thêm thể loại
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}

export default CategoryModal;
