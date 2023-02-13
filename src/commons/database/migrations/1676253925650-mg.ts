import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class mg1676253925650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            type: 'INTEGER',
          },
          {
            name: 'name',
            type: 'VARCHAR',
            length: '58',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
