import { useState, useEffect } from 'react';
import './index.css';
import { Card, Form } from 'antd';
import authApi from '../../api/authApi';
import {
  UserManagementTable,
  UserManagementTitle,
  UserManagementUpdateModal,
} from '../../components/UserManagement';

function UserManagement(props) {
  const [dataListUser, setDataListUser] = useState([]);
  const [payload, setPayload] = useState({});
  const [visible, setVisible] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    getDataUser();
  }, [payload]);

  const getDataUser = async () => {
    try {
      const response = await authApi.getListUser(payload);
      setDataListUser(response.data.data);
    } catch (error) {}
  };

  return (
    <div className='container-user'>
      <Card title={<UserManagementTitle dataListUser={dataListUser} />}>
        <UserManagementTable
          dataListUser={dataListUser}
          getDataUser={getDataUser}
          setVisible={setVisible}
          setDataRow={setDataRow}
          form={form}
          payload={payload}
          setPayload={setPayload}
        />
        <UserManagementUpdateModal
          visible={visible}
          setVisible={setVisible}
          dataRow={dataRow}
          form={form}
          getDataUser={getDataUser}
        />
      </Card>
    </div>
  );
}

export default UserManagement;
