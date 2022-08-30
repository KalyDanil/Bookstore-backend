import type { MigrationInterface, QueryRunner } from 'typeorm';
/* eslint-disable */
export class LikedBooks1661336754038 implements MigrationInterface {
  name = 'LikedBooks1661336754038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "book_ratings" RENAME COLUMN "bookRatingId" TO "id"');
    await queryRunner.query('ALTER TABLE "book_ratings" RENAME CONSTRAINT "PK_da36f3a5f13313dcd2a2bf413a8" TO "PK_8393acfb46403c657edb950f7c1"');
    await queryRunner.query('ALTER SEQUENCE "book_ratings_bookRatingId_seq" RENAME TO "book_ratings_id_seq"');
    await queryRunner.query('CREATE TABLE "liked_books" ("id" SERIAL NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7b3e0b2cf98008463e8ee20d5b4" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "liked_books" ADD CONSTRAINT "FK_0b3d1b11c77cebe9bcabd7aa6e8" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "liked_books" ADD CONSTRAINT "FK_7c1ce684b2d7cd65405f04c23e0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "liked_books" DROP CONSTRAINT "FK_7c1ce684b2d7cd65405f04c23e0"');
    await queryRunner.query('ALTER TABLE "liked_books" DROP CONSTRAINT "FK_0b3d1b11c77cebe9bcabd7aa6e8"');
    await queryRunner.query('DROP TABLE "liked_books"');
    await queryRunner.query('ALTER SEQUENCE "book_ratings_id_seq" RENAME TO "book_ratings_bookRatingId_seq"');
    await queryRunner.query('ALTER TABLE "book_ratings" RENAME CONSTRAINT "PK_8393acfb46403c657edb950f7c1" TO "PK_da36f3a5f13313dcd2a2bf413a8"');
    await queryRunner.query('ALTER TABLE "book_ratings" RENAME COLUMN "id" TO "bookRatingId"');
  }
}
