import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class cartTable1679386279107 implements MigrationInterface {
  name = 'cartTable1679386279107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart',
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
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'pet_id',
            type: 'int',
            unsigned: true,
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
      'cart',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cart',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('cart');

    // Drop FK pet
    const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyPet);
    await queryRunner.dropColumn('cart', 'user_id');

    // Drop FK user
    const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_id') !== -1);
    await queryRunner.dropForeignKey('pet_id', foreignKeyUser);
    await queryRunner.dropColumn('cart', 'pet_id');

    await queryRunner.dropTable('cart');
  }
}
