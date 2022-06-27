import { useEffect, useContext, useState } from 'react';
import dayjs from 'dayjs';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { AuthContext } from '../../Context/AuthProvider';
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  List,
  Avatar,
  Skeleton,
  message,
  Popconfirm,
} from 'antd';
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { apiSocket } from '../../constants';

const { Title } = Typography;

function ProductComment({ idProduct }) {
  const [isComment, setIsComment] = useState(null);
  const [isDisableInput, setIsDisableInput] = useState(true);
  const [isCheckId, setIsCheckId] = useState(null);
  const {
    postComment,
    getComment,
    dataComment,
    setDataComment,
    isLoadingBtnComment,
    deleteComment,
    updateComment,
  } = useContext(ProductManagementContext);
  const {
    isInfoUsername: { isAuthentication, username },
  } = useContext(AuthContext);
  const [formComment] = Form.useForm();
  useEffect(() => {
    getComment(idProduct);
  }, [idProduct]);
  useEffect(() => {
    const socket = io(apiSocket);
    socket.on('add-comment', newComment => setDataComment(newComment));
    socket.on('delete-comment', newComment => setDataComment(newComment));
    socket.on('update-comment', newComment => setDataComment(newComment));
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  const onClear = () => {
    setIsComment(null);
    setIsDisableInput(true);
    setIsCheckId(null);
  };
  const onPressEnter = (commentId, productId, data) => {
    updateComment(commentId, productId, data);
    onClear();
  };
  const onFinish = async () => {
    try {
      if (!isAuthentication) {
        message.error('Bạn cần đăng nhập');
        formComment.resetFields();
        return;
      }
      const textComment = formComment.getFieldValue();
      const data = { comment: textComment.comment };
      postComment(idProduct, data);
      formComment.resetFields();
    } catch (error) {}
  };

  return (
    <div style={{ margin: '20px 0px' }}>
      <Title level={5}>Bình luận</Title>
      <Form name='formComment' form={formComment} onFinish={onFinish}>
        <Row>
          <Col span={22}>
            <Form.Item name='comment'>
              <Input.TextArea
                placeholder='Viết bình luận'
                style={{
                  height: '40px',
                }}
                onPressEnter={onFinish}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{
                  height: '40px',
                }}
                loading={isLoadingBtnComment}
              >
                <SendOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {dataComment.length ? (
        <List
          className='demo-loadmore-list'
          itemLayout='horizontal'
          dataSource={dataComment}
          pagination={{
            pageSize: 5,
          }}
          size={false}
          renderItem={item => (
            <List.Item
              actions={
                username?._id === item.userId
                  ? [
                      <EditOutlined
                        className='comment-action'
                        onClick={() => {
                          setIsComment(item.comment);
                          setIsDisableInput(false);
                          setIsCheckId(item._id);
                        }}
                      />,
                      <Popconfirm
                        title='Are you sure to delete this task?'
                        onConfirm={() =>
                          deleteComment(item._id, item.productId)
                        }
                        okText='Yes'
                        cancelText='No'
                      >
                        <DeleteOutlined className='comment-action' />,
                      </Popconfirm>,
                    ]
                  : null
              }
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.avatar || null}
                      icon={!item.avatar && item.username[0].toUpperCase()}
                    />
                  }
                  title={<a href='https://ant.design'>{item.username}</a>}
                  description={
                    !isCheckId && item._id === isCheckId ? (
                      <div> {item.comment} </div>
                    ) : (
                      <Input
                        value={
                          item._id === isCheckId ? isComment : item.comment
                        }
                        disabled={item._id === isCheckId ? false : true}
                        style={{
                          border:
                            item._id === isCheckId
                              ? '1px solid #d9d9d9'
                              : 'none',
                          background: 'inherit',
                          color: 'rgba(0, 0, 0, 0.45)',
                        }}
                        onChange={e => {
                          setIsComment(e.target.value);
                        }}
                        onPressEnter={e =>
                          onPressEnter(item._id, item.productId, {
                            comment: e.target.value,
                          })
                        }
                        onBlur={onClear}
                      />
                    )
                  }
                />
                <div>{dayjs(item.createdAt).format('DD-MM-YYYY')}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      ) : null}
    </div>
  );
}

export default ProductComment;
