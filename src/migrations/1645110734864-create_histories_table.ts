import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createHistoriesTable1645110734864 implements MigrationInterface {
  name = 'createHistoriesTable1645110734864';

  foreignKey = new TableForeignKey({
    name: 'FK_histories_user',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'histories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'to',
            type: 'varchar',
          },
          {
            name: 'tx_hash',
            type: 'varchar',
          },
          {
            name: 'block_number',
            type: 'varchar',
          },
          {
            name: 'log_index',
            type: 'int',
          },
          {
            name: 'action',
            type: 'varchar',
          },
          {
            name: 'block_timestamp',
            type: 'int',
          },
          {
            name: 'pool_id',
            type: 'int',
            default: null,
          },
          {
            name: 'data',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey('histories', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS histories`);
  }
}
