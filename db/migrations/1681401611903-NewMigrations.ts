import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1681401611903 implements MigrationInterface {
    name = 'NewMigrations1681401611903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "type" "public"."transaction_type_enum" NOT NULL DEFAULT 'profitable', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "bankId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "balance" integer NOT NULL DEFAULT '0', "name" character varying NOT NULL, CONSTRAINT "UQ_11f196da2e68cef1c7e84b4fe94" UNIQUE ("name"), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_transaction" ("categoryId" integer NOT NULL, "transactionId" integer NOT NULL, CONSTRAINT "PK_38cd2d9e223fd9d6150aa4bce34" PRIMARY KEY ("categoryId", "transactionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_193e5d0c0fd2c3f4d1e8714efb" ON "category_transaction" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf7c4b979fe086f5e6a687f7a0" ON "category_transaction" ("transactionId") `);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d8686d6790ecde6318e48232d06" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_transaction" ADD CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_cf7c4b979fe086f5e6a687f7a0c"`);
        await queryRunner.query(`ALTER TABLE "category_transaction" DROP CONSTRAINT "FK_193e5d0c0fd2c3f4d1e8714efb8"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d8686d6790ecde6318e48232d06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf7c4b979fe086f5e6a687f7a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_193e5d0c0fd2c3f4d1e8714efb"`);
        await queryRunner.query(`DROP TABLE "category_transaction"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
