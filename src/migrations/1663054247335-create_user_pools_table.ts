import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createUserPoolsTable1663054247335 implements MigrationInterface {
  name = 'createUserPoolsTable1663054247335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_pools',
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
          },
          {
            name: 'pool_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'start_stake',
            type: 'int',
          },
          {
            name: 'total_stake',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            default: 0,
          },
          {
            name: 'total_claim',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user_pools',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_pools',
      new TableForeignKey({
        columnNames: ['pool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pools',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_pools');

    // Drop FK user_id
    const foreignKeyUserId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyUserId);
    await queryRunner.dropColumn('user_pools', 'user_id');

    // Drop FK pool_id
    const foreignKeyPoolId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pool_id') !== -1);
    await queryRunner.dropForeignKey('pool_id', foreignKeyPoolId);
    await queryRunner.dropColumn('user_pools', 'pool_id');

    await queryRunner.dropTable('user_pools');
  }
}
