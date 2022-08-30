import type { MigrationInterface, QueryRunner } from 'typeorm';
/* eslint-disable */
export class BookRatings1661336080025 implements MigrationInterface {
  name = 'BookRatings1661336080025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "book_ratings" ("bookRatingId" SERIAL NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, "rating" integer NOT NULL, CONSTRAINT "PK_da36f3a5f13313dcd2a2bf413a8" PRIMARY KEY ("bookRatingId"))');
    await queryRunner.query('ALTER TABLE "book_ratings" ADD CONSTRAINT "FK_b39edd0d2bffb778c8a08be7cc4" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "book_ratings" ADD CONSTRAINT "FK_854de1dea5054fce70de352c10f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "book_ratings" DROP CONSTRAINT "FK_854de1dea5054fce70de352c10f"');
    await queryRunner.query('ALTER TABLE "book_ratings" DROP CONSTRAINT "FK_b39edd0d2bffb778c8a08be7cc4"');
    await queryRunner.query('DROP TABLE "book_ratings"');
  }
}
