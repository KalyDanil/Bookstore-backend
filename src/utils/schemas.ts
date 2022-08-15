import * as yup from 'yup';

export const yupValidationShape = {
  fullName: yup.string(),
  email: yup.string().email(),
  password: yup.string().password(),
};
