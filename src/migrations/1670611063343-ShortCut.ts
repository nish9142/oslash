import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortCut1670611063343 implements MigrationInterface {
    name = 'ShortCut1670611063343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "short_cut" ("id" SERIAL NOT NULL, "shortlink" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "tags" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_39ff9efb40905bf51910f43a394" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "short_cut" ADD CONSTRAINT "FK_1caa77388183ec03fa538d9dd1a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" DROP CONSTRAINT "FK_1caa77388183ec03fa538d9dd1a"`);
        await queryRunner.query(`DROP TABLE "short_cut"`);
    }

}
