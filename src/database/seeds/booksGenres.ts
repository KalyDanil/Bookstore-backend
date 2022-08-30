import { In } from 'typeorm';
import { AppDataSource, dbReps } from '../dataSource';
/* eslint-disable */
(async () => {
  await AppDataSource.initialize();

  const genres1 = await dbReps.Genres.find({
    where: { name: In(['Fiction', 'Light fiction', 'Fantasy']) },
  });

  const genres2 = await dbReps.Genres.find({
    where: { name: In(['Non-fiction', 'Business & Finance', 'Travel books']) },
  });

  const genres3 = await dbReps.Genres.find({
    where: { name: In(['Romance', 'Health / Medicine', 'Satire']) },
  });

  const genres4 = await dbReps.Genres.find({
    where: { name: In(['Horror', 'Children\'s books', 'Politics']) },
  });

  const books1 = await dbReps.Books.find({
    skip: 0,
    take: 3,
  });

  const books2 = await dbReps.Books.find({
    skip: 3,
    take: 3,
  });

  const books3 = await dbReps.Books.find({
    skip: 6,
    take: 3,
  });

  const books4 = await dbReps.Books.find({
    skip: 9,
    take: 3,
  });

  for (let i = 0; i < books1.length; i++) {
    books1[i].genres = genres1;
    await dbReps.Books.save(books1[i]);
  }

  for (let i = 0; i < books2.length; i++) {
    books2[i].genres = genres2;
    await dbReps.Books.save(books2[i]);
  }

  for (let i = 0; i < books3.length; i++) {
    books3[i].genres = genres3;
    await dbReps.Books.save(books3[i]);
  }

  for (let i = 0; i < books4.length; i++) {
    books4[i].genres = genres4;
    await dbReps.Books.save(books4[i]);
  }
})();
