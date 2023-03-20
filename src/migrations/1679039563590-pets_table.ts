import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class petsTable1679039563590 implements MigrationInterface {
  name = 'petsTable1679039563590';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'tinyint(3)',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'species',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'breed',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'image_url',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'pet_owner_id',
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
            name: 'is_available',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'delete_flg',
            type: 'boolean',
            isNullable: false,
            default: false,
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
      'pets',
      new TableForeignKey({
        columnNames: ['pet_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pets');

    // Drop FK user
    const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_owner_id') !== -1);
    await queryRunner.dropForeignKey('pet_owner_id', foreignKeyUser);
    await queryRunner.dropColumn('pets', 'pet_owner_id');

    await queryRunner.dropTable('pets');
  }
}
