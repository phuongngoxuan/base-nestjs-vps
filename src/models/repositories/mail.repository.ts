import { EntityRepository, Repository } from 'typeorm';
import { MailEntity } from '../entities/mail.entity';
 
@EntityRepository(MailEntity)
export class MailRepository extends Repository<MailEntity> {}
