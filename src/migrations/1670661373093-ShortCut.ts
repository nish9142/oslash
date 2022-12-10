import { MigrationInterface, QueryRunner } from "typeorm";

export class ShortCut1670661373093 implements MigrationInterface {
    name = 'ShortCut1670661373093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" ADD "search" tsvector`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_cut" DROP COLUMN "search"`);
    }

}
