import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class messageChatsTable1679039271210 implements MigrationInterface {
  name = 'messageChatsTable1679039271210';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_chat',
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
      'message_chat',
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'message_chat',
      new TableForeignKey({
        columnNames: ['receiver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('message_chat');

    // Drop FK sender
    const foreignKeySender = table.foreignKeys.find((fk) => fk.columnNames.indexOf('sender_id') !== -1);
    await queryRunner.dropForeignKey('sender_id', foreignKeySender);
    await queryRunner.dropColumn('message_chat', 'sender_id');

    // Drop FK receiver
    const foreignKeyReceiver = table.foreignKeys.find((fk) => fk.columnNames.indexOf('receiver_id') !== -1);
    await queryRunner.dropForeignKey('receiver_id', foreignKeyReceiver);
    await queryRunner.dropColumn('message_chat', 'receiver_id');

    await queryRunner.dropTable('message_chat');
  }
}
