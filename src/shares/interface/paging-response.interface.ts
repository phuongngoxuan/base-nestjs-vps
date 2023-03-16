import { UsersEntity } from 'src/models/entities/users.entity';

export interface UserList {
  items: UsersEntity[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}
