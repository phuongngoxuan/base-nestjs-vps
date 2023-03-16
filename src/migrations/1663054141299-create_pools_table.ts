import { PoolAPRType, PoolStatus, PoolType } from 'src/shares/enums/pool.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPoolsTable1663054141299 implements MigrationInterface {
  name = 'createPoolsTable1663054141299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pools',
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
            name: 'address',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'stake_tokens',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'reward_tokens',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'chain',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar(20)',
            isNullable: false,
            default: `'${PoolType.SINGLE}'`,
            comment: Object.keys(PoolType).join(','),
          },
          {
            name: 'status',
            type: 'varchar(20)',
            isNullable: false,
            default: `'${PoolStatus.LIVE}'`,
            comment: Object.keys(PoolStatus).join(','),
          },
          {
            name: 'apr',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'apr_type',
            type: 'varchar(20)',
            isNullable: false,
            default: `'${PoolAPRType.FIXED}'`,
            comment: Object.keys(PoolAPRType).join(','),
          },
          {
            name: 'multiplier',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'reward_per_block',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'staking_limit',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'end_block',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'start_block',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
          },
          {
            name: 'lock_period',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            comment: 'Number of days will be locked',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pools');
  }
}
