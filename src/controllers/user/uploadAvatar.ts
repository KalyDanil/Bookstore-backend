import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import { dbReps } from '../../database/dataSource';
import type { IReqUser } from '../../types/req';
import { uploadFromPath, uploadToPath } from '../../utils/constants';

export const uploadAvatar = async (req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const id = req.user.id;
    const base64Image = req.body.image.split(';base64,').pop();
    const imageName = `${id}${req.body.imageName}`;
    const path = `${uploadToPath}${imageName}`;
    const oldUser = await dbReps.Users.findOne({
      where: {
        id,
      },
    });
    const oldPath = `${uploadToPath}${oldUser.avatar.split('/')[4]}`;
    await fs.promises.unlink(oldPath);
    await fs.promises.writeFile(path, base64Image, { encoding: 'base64' });
    await dbReps.Users.update({
      id,
    }, {
      avatar: `${uploadFromPath}${imageName}`,
    });

    const user = await dbReps.Users.findOne({
      where: {
        id,
      },
    });

    await dbReps.Comments.update({
      user,
    }, {
      avatar: `${uploadFromPath}${imageName}`,
    });

    return res.status(StatusCodes.OK).json('Avatar was uploaded');
  } catch (err) { next(err); }
};
