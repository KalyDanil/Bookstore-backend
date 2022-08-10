import express from 'express';
import { tokenVerify } from '../middlewares/tokenVerify';
import authController from '../controllers/authController';

const authorizationRouter = express.Router();

authorizationRouter.post('/registration', authController.registration);

authorizationRouter.get('/authorization', authController.authorization);

authorizationRouter.get('/authorizationByToken', tokenVerify, authController.authorizationByToken);

export default authorizationRouter;
