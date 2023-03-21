import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class petsTable1679039563590 implements MigrationInterface {
  name = 'petsTable1679039563590';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pet',
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
            name: 'color',
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
            name: 'price',
            type: 'DECIMAL(40,5)',
            isNullable: false,
          },
          {
            name: 'shop_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'dad_pet_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'mother_pet_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'list_image',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'health',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'updated_by',
            type: 'int',
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
      'pet',
      new TableForeignKey({
        columnNames: ['pet_owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['shop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['dad_pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'pet',
      new TableForeignKey({
        columnNames: ['mother_pet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pet',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pet');

    // Drop FK Pet Owner
    const foreignKeyPetOwner = table.foreignKeys.find((fk) => fk.columnNames.indexOf('pet_owner_id') !== -1);
    await queryRunner.dropForeignKey('pet_owner_id', foreignKeyPetOwner);
    await queryRunner.dropColumn('pet', 'pet_owner_id');

    // Drop FK Shop
    const foreignKeyShop = table.foreignKeys.find((fk) => fk.columnNames.indexOf('shop_id') !== -1);
    await queryRunner.dropForeignKey('shop_id', foreignKeyShop);
    await queryRunner.dropColumn('pet', 'shop_id');

    // Drop FK Dad Pet
    const foreignKeyDadPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('dad_pet_id') !== -1);
    await queryRunner.dropForeignKey('dad_pet_id', foreignKeyDadPet);
    await queryRunner.dropColumn('pet', 'dad_pet_id');

    // Drop FK Mother Pet
    const foreignKeyMotherPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('mother_pet_id') !== -1);
    await queryRunner.dropForeignKey('mother_pet_id', foreignKeyMotherPet);
    await queryRunner.dropColumn('pet', 'mother_pet_id');

    await queryRunner.dropTable('pet');
  }
}
