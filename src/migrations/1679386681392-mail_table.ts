import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class mailTable1679386681392 implements MigrationInterface {
  name = 'mailTable1679386681392';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mail',
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
            name: 'meta',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart');
  }
}
