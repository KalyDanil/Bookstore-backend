import { genres } from '../dataForSeeds/genres';
import { AppDataSource, dbReps } from '../dataSource';
/* eslint-disable */
(async () => {
  await AppDataSource.initialize();

  for (const genre in genres) {
    await dbReps.Genres.save(genres[genre]);
  }
})();
