import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class reviewsTable1679039591072 implements MigrationInterface {
  name = 'reviewsTable1679039591072';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reviews',
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
            name: 'pet_vendor_id',
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
            name: 'image_url',
            type: 'varchar',
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
      'reviews',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'reviews',
      new TableForeignKey({
        columnNames: ['pet_vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet_vendors',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reviews');

    // Drop FK user
    const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyUser);
    await queryRunner.dropColumn('reviews', 'user_id');

    // Drop FK pet vendor
    const foreignKeyPetVendor = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_vendor_id') !== -1);
    await queryRunner.dropForeignKey('pet_vendor_id', foreignKeyPetVendor);
    await queryRunner.dropColumn('reviews', 'pet_vendor_id');

    await queryRunner.dropTable('reviews');
  }
}
