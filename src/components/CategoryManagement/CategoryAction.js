import { Button } from 'antd';
import './index.css';
import { PlusOutlined } from '@ant-design/icons';

function CategoryAction({ setIsVisibleCategoryModal }) {
  return (
    <div className="categoryAction">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsVisibleCategoryModal(true)}
      >
        Thêm thể loại
      </Button>
    </div>
  );
}

export default CategoryAction;
