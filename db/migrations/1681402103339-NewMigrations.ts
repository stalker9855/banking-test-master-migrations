import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1681402103339 implements MigrationInterface {
    name = 'NewMigrations1681402103339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8"`);
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c"`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c"`);
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8"`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
