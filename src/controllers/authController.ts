import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { passwordHash, passwordVerify } from '../utils/functions/bcrypt';
import createError from '../utils/functions/errCreater';
import { jsonTransformation } from '../utils/functions/json';
import { jwtSign } from '../utils/functions/jwt';
import { emailValidate, passwordValidate } from '../utils/functions/validation';
import { AppDataSource } from '../database/dataSource';
import { Users } from '../database/entity/Users';
import { IUserAuthInfoRequest } from '../utils/types/req';

const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password
    } = req.body;
   
    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const emailValidation = await emailValidate(email);
    const passwordValidation  = await passwordValidate(password);

    if (emailValidation.errors || passwordValidation.errors) {
      throw createError(
        StatusCodes.NOT_ACCEPTABLE,
        emailValidation.errors ? emailValidation.errors[0] : passwordValidation.errors[0]
      );
    }

    const user0 = new Users();
    user0.email = email;
    user0.password = passwordHash(password);
    const user = await AppDataSource.getRepository(Users).save(user0);
    const answer = jsonTransformation(user);
    delete answer.password;
    answer.token = jwtSign(user.id);

    return res.status(200).json(answer);
  } catch (err) { 
    console.log(err.message);
    if (err.message === 'duplicate key value violates unique constraint "UQ_97672ac88f789774dd47f7c8be3"') {
      next(createError(
        StatusCodes.BAD_REQUEST,
        'This email is already taken',
      ));
    }
    next(err); 
  }
}

const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password
    } = req.query;

    if (!email && !password) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required body parameters',
      );
    }

    const user = await AppDataSource.getRepository(Users).findOneBy({
      email: email.toString(),
    });

    if (user && passwordVerify(password.toString(), user.password)) {
      const answer = jsonTransformation(user);
      delete answer.password;
      answer.token = jwtSign(user.id);
      return res.status(200).json(answer);
    };

    throw createError(
      StatusCodes.BAD_REQUEST,
      'Wrong email or password',
    );
  } catch (err) { next(err); }
}

const authorizationByToken = async (req: IUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) { next(err); }
}

const authController = {
  registration,
  authorization,
  authorizationByToken
}

export default authController;