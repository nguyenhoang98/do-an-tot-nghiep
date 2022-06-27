import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function ProductAction({ setIsVisibleModal }) {
  return (
    <div className="product-add">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsVisibleModal(true)}
      >
        Thêm sản phẩm
      </Button>
    </div>
  );
}

export default ProductAction;
