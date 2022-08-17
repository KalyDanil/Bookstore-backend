import express from 'express';
import { editInfo } from '../controllers/userController/editInfo';
import { editPassword } from '../controllers/userController/editPassword';
import { uploadAvatar } from '../controllers/userController/uploadAvatar';
import { tokenVerify } from '../middlewares/tokenVerify';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import { editInfoShape, editPasswordShape } from '../utils/schemas';

const userRouter = express.Router();

userRouter.put('/edit-info', tokenVerify, createValidationMiddleware(editInfoShape), editInfo);

userRouter.put('/edit-password', tokenVerify, createValidationMiddleware(editPasswordShape), editPassword);

userRouter.post('/avatar-upload', tokenVerify, uploadAvatar);

export default userRouter;
