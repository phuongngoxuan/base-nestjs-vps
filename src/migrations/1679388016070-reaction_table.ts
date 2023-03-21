import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class reactionTable1679388016070 implements MigrationInterface {
    name = 'reactionTable1679388016070'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'reaction',
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
                name: 'type',
                type: 'int',
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
          'reaction',
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          }),
        );
    
        await queryRunner.createForeignKey(
          'reaction',
          new TableForeignKey({
            columnNames: ['post_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'post',
            onDelete: 'CASCADE',
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('reaction');
    
        // Drop FK user
        const foreignKeyPet = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        await queryRunner.dropForeignKey('user_id', foreignKeyPet);
        await queryRunner.dropColumn('reaction', 'user_id');
    
        // Drop FK post
        const foreignKeyPost = table.foreignKeys.find((fk) => fk.columnNames.indexOf('post_id') !== -1);
        await queryRunner.dropForeignKey('post_id', foreignKeyPost);
        await queryRunner.dropColumn('reaction', 'post_id');
    
        await queryRunner.dropTable('reaction');
      }

}
