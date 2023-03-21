import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class postTable1679386925126 implements MigrationInterface {
  name = 'postTable1679386925126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post',
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
            name: 'text',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'comment_count',
            type: 'int',
            unsigned: true,
            isNullable: false,
            default: 0,
          },
          {
            name: 'reaction_count',
            type: 'int',
            unsigned: true,
            isNullable: false,
            default: 0,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'deleted_by',
            type: 'int',
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
      'post',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('post');

    // Drop FK user
    const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyPet);
    await queryRunner.dropColumn('post', 'user_id');

    await queryRunner.dropTable('post');
  }
}
