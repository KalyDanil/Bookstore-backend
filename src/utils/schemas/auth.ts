import * as yup from 'yup';

export const registrationShape = {
  email: yup.string().email().required(),
  password: yup.string().password().required(),
};

export const authorizationShape = {
  email: yup.string().required(),
  password: yup.string().required(),
};
