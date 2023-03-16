import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTokensTable1663054169335 implements MigrationInterface {
  name = 'createTokensTable1663054169335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
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
            name: 'token0_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'token1_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'chain',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'thumb_logo',
            type: 'varchar',
          },
          {
            name: 'large_logo',
            type: 'varchar',
          },
          {
            name: 'usd',
            type: 'decimal',
            precision: 40,
            scale: 10,
            isNullable: false,
            default: 0,
          },
          {
            name: 'existed_on_coingecko',
            type: 'boolean',
            default: true,
          },
          {
            name: 'token_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'symbol',
            type: 'varchar',
          },
          {
            name: 'symbol_token_lp',
            type: 'varchar',
          },
          {
            name: 'decimal',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
