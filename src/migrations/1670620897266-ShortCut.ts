import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortCut1670620897266 implements MigrationInterface {
    name = 'ShortCut1670620897266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "short_cut" ADD CONSTRAINT "UQ_1dd986725a0fe332e909edef1a7" UNIQUE ("shortlink", "userId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" DROP CONSTRAINT "UQ_1dd986725a0fe332e909edef1a7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "short_cut" DROP COLUMN "createdDate"`);
    }

}
