import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  Unique,
  Default,
} from 'sequelize-typescript';
import { RoleType } from '../common/constants/role-type';
import { UtilsService } from '../providers/utils.service';
// @ts-ignore
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = { timestamps: true } as IDefineOptions;

const utilsService = new UtilsService();

@Table(tableOptions)
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  name: string;

  @Default(RoleType.USER)
  @Column
  role: RoleType;

  @Unique
  @Column
  email: string;

  @Column
  company: string;

  @Column
  password: string;

  @Column
  imageUrl: string;

  @Column
  street: string;

  @Column
  zip: string;

  @Column
  country: string;

  @Column
  phone: string;

  @BeforeCreate
  static hashPassword(instance: User) {
    instance.password = utilsService.generateHash(instance.password);
  }

  getPublicFields() {
    const { email, name, company, zip, street, phone, country, imageUrl } = this;
    return {
      email,
      name,
      company,
      zip,
      street,
      phone,
      country,
      imageUrl
    }
  }
}
