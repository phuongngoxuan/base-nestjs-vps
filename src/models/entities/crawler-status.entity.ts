import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('crawl_status')
export class CrawlEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'contract_name', nullable: false })
  public contractName: string;

  @Column({ name: 'contract_address', nullable: false })
  public contractAddress: string;

  @Column({ name: 'block_number', nullable: false })
  public blockNumber: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: number;
}
