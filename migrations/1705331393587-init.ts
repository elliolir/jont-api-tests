import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1705331393587 implements MigrationInterface {
  name = 'Init1705331393587'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "todo"
                             (
                                 "id"        SERIAL            NOT NULL,
                                 "value"     character varying NOT NULL,
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "deletedAt" TIMESTAMP,
                                 CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }

}
