import express from 'express';
import { editInfo } from '../controllers/user/editInfo';
import { editPassword } from '../controllers/user/editPassword';
import { uploadAvatar } from '../controllers/user/uploadAvatar';
import { tokenVerify } from '../middlewares/tokenVerify';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import { avatarUploadShape, editInfoShape, editPasswordShape } from '../utils/schemas/user';

const userRouter = express.Router();

userRouter.put('/edit-info', tokenVerify, createValidationMiddleware(editInfoShape, 'body'), editInfo);

userRouter.put('/edit-password', tokenVerify, createValidationMiddleware(editPasswordShape, 'body'), editPassword);

userRouter.post('/avatar-upload', tokenVerify, createValidationMiddleware(avatarUploadShape, 'body'), uploadAvatar);

export default userRouter;
