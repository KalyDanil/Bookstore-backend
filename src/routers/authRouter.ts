import express from 'express';
import { tokenVerify } from '../middlewares/tokenVerify';
import { registration } from '../controllers/authController/registration';
import { authorization } from '../controllers/authController/authorization';
import { authorizationByToken } from '../controllers/authController/byToken';

const authorizationRouter = express.Router();

authorizationRouter.post('/registration', registration);

authorizationRouter.get('/authorization', authorization);

authorizationRouter.get('/authorization-by-token', tokenVerify, authorizationByToken);

export default authorizationRouter;
