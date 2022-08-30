import * as yup from 'yup';

export const editInfoShape = {
  fullName: yup.string().nullable(),
  email: yup.string().email().required(),
};

export const editPasswordShape = {
  oldPassword: yup.string().required(),
  password: yup.string().password().required(),
};

export const avatarUploadShape = {
  image: yup.string().required(),
  imageName: yup.string().required(),
};
