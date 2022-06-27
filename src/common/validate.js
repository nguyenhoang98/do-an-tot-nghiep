export const validateUsername = value => {
  const regexString = /^[\w]{5,10}$/g;
  if (!value?.trim()) {
    return Promise.reject("'Vui lòng nhập trường này'");
  }
  if (!regexString.test(value)) {
    return Promise.reject('số lượng kí tự 5-10 , không có các ký tự đặc biệt');
  }
  return Promise.resolve();
};

export const validatePassword = value => {
  const regexString = /^[\w]{5,10}$/g;
  if (!value?.trim()) {
    return Promise.reject("'Vui lòng nhập trường này'");
  }
  if (!regexString.test(value)) {
    return Promise.reject('số lượng kí tự 5-10 , không có các ký tự đặc biệt');
  }
  return Promise.resolve();
};

export const validateEditPassword = value => {
  const regexString = /^[\w]{5,10}$/g;
  if (!value?.trim()) {
    return Promise.resolve();
  }
  if (!regexString.test(value)) {
    return Promise.reject('số lượng kí tự 5-10 , không có các ký tự đặc biệt');
  }
  return Promise.resolve();
};

export const validateEmail = value => {
  const regexString = /^[\w]*@gmail[a-zA-Z0-9_.]*$/g;
  if (!value?.trim()) {
    return Promise.reject("'Vui lòng nhập trường này'");
  }
  if (!regexString.test(value)) {
    return Promise.reject('Không đúng định dạng @gmail');
  }
  return Promise.resolve();
};

export const validateNumberPhone = value => {
  const regexString = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!value?.trim()) {
    return Promise.reject("'Vui lòng nhập trường này'");
  }
  if (!regexString.test(value)) {
    return Promise.reject('Không đúng định dạng');
  }
  return Promise.resolve();
};
