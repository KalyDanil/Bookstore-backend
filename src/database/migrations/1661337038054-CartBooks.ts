import type { MigrationInterface, QueryRunner } from 'typeorm';
/* eslint-disable */
export class CartBooks1661337038054 implements MigrationInterface {
  name = 'CartBooks1661337038054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "cart_books" ("id" SERIAL NOT NULL, "bookId" integer NOT NULL, "userId" integer NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_c24546d9ee1d3b367f87583f324" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "cart_books" ADD CONSTRAINT "FK_1f18e6c4c4e3365ebe2206a4698" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "cart_books" ADD CONSTRAINT "FK_52800c7bfe9ff966fbdc515c9d4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "cart_books" DROP CONSTRAINT "FK_52800c7bfe9ff966fbdc515c9d4"');
    await queryRunner.query('ALTER TABLE "cart_books" DROP CONSTRAINT "FK_1f18e6c4c4e3365ebe2206a4698"');
    await queryRunner.query('DROP TABLE "cart_books"');
  }
}
