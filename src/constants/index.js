export const arrayPathNoFooter = [
  '/dang-nhap',
  '/dang-ky',
  '/thanh-toan',
  '/xac-nhan-don-hang',
  '/gio-hang-cua-ban',
];
export const arraySlider = [
  {
    content: '',
    picture:
      'https://res.cloudinary.com/dbixdfkjm/image/upload/v1647986833/banner_shop_3_lfqaub.jpg',
  },
  {
    content: '',
    picture:
      'https://res.cloudinary.com/dbixdfkjm/image/upload/v1647986813/banner_shop_1_el6qs9.jpg',
  },
  {
    content: '',
    picture:
      'https://res.cloudinary.com/dbixdfkjm/image/upload/v1647986828/banner_shop_2_q12l3i.png',
  },
];

export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://banh-chung-xanh.herokuapp.com/api';
export const apiSocket =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://banh-chung-xanh.herokuapp.com';
