import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function NotFound(props) {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi , trang này không tồn tại!"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Quay về trang chủ
        </Button>
      }
    />
  );
}

export default NotFound;
