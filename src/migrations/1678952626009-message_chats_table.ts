import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class messageChatsTable1678952626009 implements MigrationInterface {
  name = 'messageChatsTable1678952626009';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_chats',
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
            name: 'sender_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'receiver_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'message',
            type: 'text',
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
      'message_chats',
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'message_chats',
      new TableForeignKey({
        columnNames: ['receiver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('message_chats');

    // Drop FK sender
    const foreignKeySender = table.foreignKeys.find((fk) => fk.columnNames.indexOf('sender_id') !== -1);
    await queryRunner.dropForeignKey('sender_id', foreignKeySender);
    await queryRunner.dropColumn('message_chats', 'sender_id');

    // Drop FK receiver
    const foreignKeyReceiver = table.foreignKeys.find((fk) => fk.columnNames.indexOf('receiver_id') !== -1);
    await queryRunner.dropForeignKey('receiver_id', foreignKeyReceiver);
    await queryRunner.dropColumn('message_chats', 'receiver_id');

    await queryRunner.dropTable('message_chats');
  }
}
