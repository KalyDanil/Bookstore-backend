import type { MigrationInterface, QueryRunner } from 'typeorm';
/* eslint-disable */
export class Comments1661338274467 implements MigrationInterface {
  name = 'Comments1661338274467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "comments" ("id" SERIAL NOT NULL, "commentator" character varying NOT NULL, "comment" text NOT NULL, "avatar" character varying NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "bookId" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_fe496134857bf079aa6b55d68df" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"');
    await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_fe496134857bf079aa6b55d68df"');
    await queryRunner.query('DROP TABLE "comments"');
  }
}
