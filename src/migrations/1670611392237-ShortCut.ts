import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortCut1670611392237 implements MigrationInterface {
    name = 'ShortCut1670611392237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "short_cut" ALTER COLUMN "tags" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" ALTER COLUMN "tags" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "short_cut" ALTER COLUMN "description" SET NOT NULL`);
    }

}
