import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo, ForeignKey,
} from 'sequelize-typescript';

// @ts-ignore
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { TOKEN_REASONS } from '../common/constants/token-reason';
import { User } from './User';

const tableOptions: IDefineOptions = { timestamps: true } as IDefineOptions;


@Table(tableOptions)
export class Users_Tokens extends Model<Users_Tokens> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: 'id',
  })
  id: number;

  @Column
  token: string;

  @Column
  expiration: number;

  @Column
  reason: TOKEN_REASONS;

  // @BelongsTo(() => User)
  // @ForeignKey(() => User)
  @Column
  userId: number;
}
