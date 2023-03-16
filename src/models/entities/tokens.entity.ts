import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TokenPoolsEntity } from './token-pools.entity';
import { UserPoolTokenEntity } from './user-pool-tokens.entity';

@Entity('tokens')
export class TokensEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'token0_id' })
  token0Id: number;

  @Column({ name: 'token1_id' })
  token1Id: number;

  @Column()
  chain: string;

  @Column()
  address: string;

  @Column({ name: 'thumb_logo' })
  thumbLogo: string;

  @Column({ name: 'large_logo' })
  largeLogo: string;

  @Column({ name: 'token_name' })
  tokenName: string;

  @Column({ name: 'existed_on_coingecko' })
  existedOnCoingecko: boolean;

  @Column({ name: 'symbol' })
  symbol: string;

  @Column({ name: 'symbol_token_lp' })
  symbolTokenLp: string;

  @Column({ name: 'decimal' })
  decimal: number;

  @Column({ name: 'usd_price' })
  usdPrice: string;

  @Column({ name: 'coingecko_token_id' })
  coingeckoTokenId: number;

  @Column({ name: 'crawl_coingecko_time' })
  crawlCoingeckoTime: number;

  // many to many custom stake token and pool
  @OneToMany(() => TokenPoolsEntity, (UIPI) => UIPI.stakeToken)
  stakeTokenPools: TokenPoolsEntity[];

  // many to many custom reward token and pool
  @OneToMany(() => TokenPoolsEntity, (UIPI) => UIPI.rewardToken)
  rewardTokenPools: TokenPoolsEntity[];

  // many to many custom stake token and userPoolToken
  @OneToMany(() => UserPoolTokenEntity, (UPT) => UPT.stakeToken)
  stakeTokenUserPools: UserPoolTokenEntity[];

  // many to many custom reward token and userPoolToken
  @OneToMany(() => UserPoolTokenEntity, (UPT) => UPT.rewardToken)
  rewardTokenUserPools: UserPoolTokenEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
