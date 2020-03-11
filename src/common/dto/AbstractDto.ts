import { IAbstractEntity } from '../../interfaces/IAbstractEntity';

export class AbstractDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: IAbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
