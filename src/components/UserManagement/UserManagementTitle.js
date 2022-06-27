import { Badge } from 'antd';

function UserManagementTitle({ dataListUser }) {
  return (
    <div>
      Danh sách user <Badge count={dataListUser.length} showZero />
    </div>
  );
}

export default UserManagementTitle;
