export class AbstractDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: any) {
    //todo
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
