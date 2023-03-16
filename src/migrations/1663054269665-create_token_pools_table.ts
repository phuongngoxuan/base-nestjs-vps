import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class createTokenPoolsTable1663054269665 implements MigrationInterface {
  name = 'createTokenPoolsTable1663054269665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token_pools',
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
            name: 'pool_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'index',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'rate',
            type: 'decimal',
            precision: 40,
            scale: 0,
            unsigned: true,
          },
          {
            name: 'reward_token_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'stake_token_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'apr',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
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
      'token_pools',
      new TableForeignKey({
        columnNames: ['pool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pools',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'token_pools',
      new TableForeignKey({
        columnNames: ['stake_token_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tokens',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'token_pools',
      new TableForeignKey({
        columnNames: ['reward_token_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tokens',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('token_pools');

    // Drop FK user_id
    const foreignKeyUserId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyUserId);
    await queryRunner.dropColumn('token_pools', 'user_id');

    // Drop FK token_id
    const foreignKeyPoolId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('token_id') !== -1);
    await queryRunner.dropForeignKey('token_id', foreignKeyPoolId);
    await queryRunner.dropColumn('token_pools', 'token_id');

    await queryRunner.dropTable('token_pools');
  }
}
