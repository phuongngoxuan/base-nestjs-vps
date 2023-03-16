import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class proceedPetExchangesTable1678951825071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'proceed_pet_exchanges',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'pet_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'buyer_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'seller_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            enum: ['pending', 'in progress', 'completed'],
            isNullable: false,
            default: 'pending',
          },
          {
            name: 'transaction_value',
            type: 'decimal(20,2)',
            isNullable: false,
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
    await queryRunner.dropTable('proceed_pet_exchanges');
  }
}
