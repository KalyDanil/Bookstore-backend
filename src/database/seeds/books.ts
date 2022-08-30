import { books } from '../dataForSeeds/books';
import { AppDataSource, dbReps } from '../dataSource';
/* eslint-disable */
(async () => {
  await AppDataSource.initialize();

  for (const book in books) {
    await dbReps.Books.save(books[book]);
  }
})();
