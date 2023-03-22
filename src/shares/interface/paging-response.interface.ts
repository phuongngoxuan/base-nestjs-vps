import { PetEntity } from 'src/models/entities/pet.entity';
import { UserEntity } from 'src/models/entities/users.entity';


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
  items: UserEntity[];
}


export interface GetPetListRes extends meta {
  items: PetEntity[];
}
