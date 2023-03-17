import { PetsEntity } from 'src/models/entities/pets.entity';
import { UsersEntity } from 'src/models/entities/users.entity';


interface meta {
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}
export interface GetUserListRes extends meta {
  items: UsersEntity[];
}


export interface GetPetListRes extends meta {
  items: PetsEntity[];
}
