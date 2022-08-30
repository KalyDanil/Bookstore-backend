import express from 'express';
import { tokenVerify } from '../middlewares/tokenVerify';
import { registration } from '../controllers/auth/registration';
import { authorization } from '../controllers/auth/authorization';
import { authorizationByToken } from '../controllers/auth/byToken';
import { createValidationMiddleware } from '../middlewares/createValidationMiddleware';
import { authorizationShape, registrationShape } from '../utils/schemas/auth';

const authorizationRouter = express.Router();

authorizationRouter.post('/registration', createValidationMiddleware(registrationShape, 'body'), registration);

authorizationRouter.post('/authorization', createValidationMiddleware(authorizationShape, 'body'), authorization);

authorizationRouter.get('/authorization-by-token', tokenVerify, authorizationByToken);

export default authorizationRouter;
