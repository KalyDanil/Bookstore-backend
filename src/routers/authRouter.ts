import express from 'express';
import { tokenVerify } from '../middlewares/tokenVerify';
import { registration } from '../controllers/authController/registration';
import { authorization } from '../controllers/authController/authorization';
import { authorizationByToken } from '../controllers/authController/byToken';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import { registrationShape, authorizationShape } from '../utils/schemas';

const authorizationRouter = express.Router();

authorizationRouter.post('/registration', createValidationMiddleware(registrationShape), registration);

authorizationRouter.post('/authorization', createValidationMiddleware(authorizationShape), authorization);

authorizationRouter.get('/authorization-by-token', tokenVerify, authorizationByToken);

export default authorizationRouter;
