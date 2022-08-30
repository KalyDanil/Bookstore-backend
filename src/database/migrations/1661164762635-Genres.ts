import type { MigrationInterface, QueryRunner } from 'typeorm';
/* eslint-disable */
export class Genres1661164762635 implements MigrationInterface {
  name = 'Genres1661164762635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "genres"');
  }
}
