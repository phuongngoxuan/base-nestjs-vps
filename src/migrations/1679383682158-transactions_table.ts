import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class transactionsTable1679383682158 implements MigrationInterface {
  name = 'transactionsTable1679383682158';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
            unsigned: true,
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
            name: 'price',
            type: 'DECIMAL(40,5)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['buyer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['seller_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('proceed_pet_exchanges');

    // Drop FK pet
    const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_id') !== -1);
    await queryRunner.dropForeignKey('pet_id', foreignKeyPet);
    await queryRunner.dropColumn('proceed_pet_exchanges', 'pet_id');

    // Drop FK buyer
    const foreignKeyBuyer = table.foreignKeys.find((fk) => fk.columnNames.indexOf('buyer_id') !== -1);
    await queryRunner.dropForeignKey('buyer_id', foreignKeyBuyer);
    await queryRunner.dropColumn('proceed_pet_exchanges', 'buyer_id');

    // Drop FK seller
    const foreignKeySeller = table.foreignKeys.find((fk) => fk.columnNames.indexOf('seller_id') !== -1);
    await queryRunner.dropForeignKey('seller_id', foreignKeySeller);
    await queryRunner.dropColumn('proceed_pet_exchanges', 'seller_id');

    await queryRunner.dropTable('proceed_pet_exchanges');
  }
}
