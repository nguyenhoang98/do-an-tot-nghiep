import { StarOutlined } from '@ant-design/icons';

export const showRating = count => {
  const result = [];
  for (var i = 1; i <= count; i++) {
    result.push(<StarOutlined style={{ color: 'tomato' }} />);
  }
  for (var j = 1; j <= 5 - count; j++) {
    result.push(<StarOutlined />);
  }
  return result;
};
