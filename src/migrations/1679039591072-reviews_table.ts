import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class reviewsTable1679039591072 implements MigrationInterface {
  name = 'reviewsTable1679039591072';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review',
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
            name: 'shop_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'rating',
            type: 'int',
          },
          {
            name: 'comments',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'list_image',
            type: 'json',
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
      'review',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'review',
      new TableForeignKey({
        columnNames: ['pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'review',
      new TableForeignKey({
        columnNames: ['shop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('review');

    // Drop FK user
    const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyUser);
    await queryRunner.dropColumn('review', 'user_id');

    // Drop FK pet
    const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_id') !== -1);
    await queryRunner.dropForeignKey('pet_id', foreignKeyPet);
    await queryRunner.dropColumn('review', 'pet_id');

    // Drop FK shop
    const foreignKeyShop = table.foreignKeys.find((fk) => fk.columnNames.indexOf('shop_id') !== -1);
    await queryRunner.dropForeignKey('shop_id', foreignKeyShop);
    await queryRunner.dropColumn('review', 'shop_id');

    await queryRunner.dropTable('review');
  }
}
