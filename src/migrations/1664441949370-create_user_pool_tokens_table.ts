import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createUserPoolTokensTable1664441949370 implements MigrationInterface {
  name = 'createUserPoolTokensTable1664441949370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_pool_tokens',
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
            name: 'index',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'user_pool_id',
            type: 'int',
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
      'user_pool_tokens',
      new TableForeignKey({
        columnNames: ['user_pool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_pools',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_pool_tokens',
      new TableForeignKey({
        columnNames: ['stake_token_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tokens',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_pool_tokens',
      new TableForeignKey({
        columnNames: ['reward_token_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tokens',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_pool_tokens');

    // Drop FK user_pool_id
    const foreignKeyUserPoolId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_pool_id') !== -1);
    await queryRunner.dropForeignKey('user_pool_id', foreignKeyUserPoolId);
    await queryRunner.dropColumn('user_pool_tokens', 'user_pool_id');

    // Drop FK stake_token_id
    const foreignKeyStakeTokenId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('stake_token_id') !== -1);
    await queryRunner.dropForeignKey('stake_token_id', foreignKeyStakeTokenId);
    await queryRunner.dropColumn('user_pool_tokens', 'stake_token_id');

    // Drop FK reward_token_id
    const foreignKeyRewardTokenId = table.foreignKeys.find((fk) => fk.columnNames.indexOf('reward_token_id') !== -1);
    await queryRunner.dropForeignKey('reward_token_id', foreignKeyRewardTokenId);
    await queryRunner.dropColumn('user_pool_tokens', 'reward_token_id');

    await queryRunner.dropTable('user_pool_tokens');
  }
}
