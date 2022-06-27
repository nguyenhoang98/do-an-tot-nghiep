import { useNavigate } from "react-router-dom";
import { Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchModal({ refInput, isModalVisible, setIsModalVisible }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onPressEnter = e => {
    handleCancel();
    if (!e.target.value.trim()) {
      navigate(`/`);
      return;
    }
    navigate(`/search/${e.target.value}`);
  };
  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      title={null}
      closable={false}
    >
      <Input
        suffix={<SearchOutlined />}
        placeholder="Tìm kiếm"
        onPressEnter={onPressEnter}
        ref={refInput}
      />
    </Modal>
  );
}

export default SearchModal;
