import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterTableTokenSetLiquidity1665632073523 implements MigrationInterface {
  name = 'alterTableTokenSetLiquidity1665632073523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tokens', [
      new TableColumn({
        name: 'crawl_coingecko_time',
        type: 'int',
      }),
      new TableColumn({
        name: 'coingecko_token_id',
        type: 'varchar',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'usd_price',
        type: 'decimal',
        precision: 40,
        scale: 10,
        isNullable: false,
        default: 0,
      }),
    ]);
    await queryRunner.dropColumn('tokens', 'usd');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('tokens', ['crawl_coingecko_time', 'token_index', 'usd_price']);
    await queryRunner.addColumn(
      'tokens',
      new TableColumn({
        name: 'usd',
        type: 'decimal',
        precision: 40,
        scale: 10,
        isNullable: false,
        default: 0,
      }),
    );
  }
}
