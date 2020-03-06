import { Model, Repository } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { IAbstractService, IFindOptions } from '../../interfaces/IAbstractService';
import {
  DestroyOptions,
  IncludeOptions,
  Transaction,
  UpdateOptions,
  WhereOptions,
  FindOrCreateOptions
} from 'sequelize';
import { BaseException } from '../../exceptions/base.exception';

@Injectable()
export default abstract class AbstractService<T extends Model<T>> implements IAbstractService<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  async getAll(
    {
      where = {},
      order = [],
      attributes = null,
      offset = 0,
      limit = 20,
      raw = false,
    }: IFindOptions = {},
    include: IncludeOptions[] = [],
  ): Promise<T[]> {
    try {
      return this.repository.findAll({
        where,
        order,
        attributes,
        offset,
        limit,
        include,
        raw,
      });
    } catch (e) {
      this.throwError("GET_ALL", e)
    }
  }

  async get(
    {
      where = {},
      attributes = null,
    }: IFindOptions = {},
    include: IncludeOptions[] = []): Promise<T> {
    try {
      return await this.repository.findOne({
        where,
        attributes,
        include,
      });
    } catch (e) {
      this.throwError("get", e)

    }
  }

  async create(entity: object, where: WhereOptions = {}, transaction?: Transaction): Promise<T> {
    try {
      const options: FindOrCreateOptions = {
        where,
        defaults: entity,
      };

      if (transaction) {
        options.transaction = transaction;
      }
      const [instance, created] = await this.repository.findOrCreate(options);

      if (!created) {
        throw new BaseException('Sequelize create error');
      }

      return instance;
    } catch (e) {
      this.throwError("create", e)

    }
  }

  async update(id: number | string, values: object, transaction?: Transaction): Promise<T> {
    try {
      const options: UpdateOptions = {
        where: { id },
        returning: true,
      };

      if (transaction) {
        options.transaction = transaction;
      }
      const [updated, [instance]] = await this.repository.update(values, options);

      if (!updated) {
        throw new BaseException('Sequelize update error');
      }

      return instance;
    } catch (e) {
      this.throwError("UPDATE", e)
    }
  }

  async delete({ where = {} }, transaction?: Transaction): Promise<void> {
    try {
      const options: DestroyOptions = { where };
      if (transaction) {
        options.transaction = transaction;
      }
      await this.repository.destroy(options);
    } catch (e) {
      this.throwError("DELETE", e)
    }
  }

  async findOne(findData: any): Promise<T> {
    return await this.repository.findOne({ where: findData });
  }

  throwError(operationName, e){
    console.error(`Error: CRUD service - ${this.repository.name}[${operationName}]: ${e}`);
    throw new BaseException(e)
  }
}
