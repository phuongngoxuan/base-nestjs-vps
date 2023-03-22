import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class commentTable1679387503647 implements MigrationInterface {
  name = 'commentTable1679387503647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comment',
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
            name: 'message',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'post_id',
            type: 'int',
            unsigned: true,
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
      'comment',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'comment',
      new TableForeignKey({
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'post',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('comment');

    // Drop FK user
    const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user_id', foreignKeyPet);
    await queryRunner.dropColumn('comment', 'user_id');

    // Drop FK post
    const foreignKeyPost = table.foreignKeys.find((fk) => fk.columnNames.indexOf('post_id') !== -1);
    await queryRunner.dropForeignKey('post_id', foreignKeyPost);
    await queryRunner.dropColumn('comment', 'post_id');

    await queryRunner.dropTable('comment');
  }
}
