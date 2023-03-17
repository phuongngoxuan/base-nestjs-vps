import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class proceedPetExchangesTable1678951825071 implements MigrationInterface {
  name = 'proceedPetExchangesTable1678951825071';
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
            name: 'pet_vendor_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
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

    await queryRunner.createForeignKey(
      'proceed_pet_exchanges',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pets',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'proceed_pet_exchanges',
      new TableForeignKey({
        columnNames: ['buyer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'proceed_pet_exchanges',
      new TableForeignKey({
        columnNames: ['seller_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'proceed_pet_exchanges',
      new TableForeignKey({
        columnNames: ['pet_vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet_vendors',
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

    // Drop FK pet vendor
    const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_vendor_id') !== -1);
    await queryRunner.dropForeignKey('pet_vendor_id', foreignKeyUser);
    await queryRunner.dropColumn('proceed_pet_exchanges', 'pet_vendor_id');

    await queryRunner.dropTable('proceed_pet_exchanges');
  }
}
