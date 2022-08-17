import * as yup from 'yup';

export const registrationShape = {
  email: yup.string().email().required(),
  password: yup.string().password().required(),
};

export const authorizationShape = {
  email: yup.string().required(),
  password: yup.string().required(),
};

export const editInfoShape = {
  fullName: yup.string().nullable(),
  email: yup.string().email().required(),
};

export const editPasswordShape = {
  oldPassword: yup.string().required(),
  password: yup.string().password().required(),
};
