// import yup from 'yup';
// import yupPassword from 'yup-password';

const yup = require('yup');
require('yup-password')(yup);

const schema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email(),
  password: yup.string().password(),
});

export const emailValidate = async (email: string) => {
  return await schema.validate({
    email: email,
  }).catch(function (err) {
    return err
  });
};

export const passwordValidate = async (password: string) => {
  return await schema.validate({
    password: password,
  }).catch(function (err) {
    return err
  });
};
