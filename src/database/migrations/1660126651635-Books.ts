import { MigrationInterface, QueryRunner } from "typeorm";

export class Books1660126651635 implements MigrationInterface {
    name = 'Books1660126651635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "authorname" character varying NOT NULL, "description" text NOT NULL, "paperBackPrice" double precision NOT NULL, "price" double precision NOT NULL, "dateofissue" character varying NOT NULL, "rating" integer NOT NULL, "cover" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
