import { EntityRepository, Repository } from 'typeorm';
import { MessageChatEntity } from '../entities/message-chats.entity';
 
@EntityRepository(MessageChatEntity)
export class MessageChatRepository extends Repository<MessageChatEntity> {}
