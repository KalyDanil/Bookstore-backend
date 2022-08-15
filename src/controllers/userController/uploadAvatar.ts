import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import { dbReps } from '../../database/dataSource';
import createError from '../../utils/errCreator';
import type { IReqUser } from '../../types/req';

export const uploadAvatar = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const id = req.user.id;
    const base64Image = req.body.image.split(';base64,').pop();
    const imageName = req.body.imageName;

    if (!imageName) {
      throw createError(
        StatusCodes.BAD_REQUEST,
        'Missing required file parameter',
      );
    }
    const path = `./public/uploads/${imageName}`;
    fs.writeFile(path, base64Image, { encoding: 'base64' }, (err) => {
      if (err) throw err;
      console.log('The file has been saved');
    });
    const user = await dbReps.Users.findOneBy({
      id,
    });
    user.avatar = imageName;
    await dbReps.Users.save(user);
    return res.status(StatusCodes.OK).json('Avatar was uploaded');
  } catch (err) { next(err); }
};
