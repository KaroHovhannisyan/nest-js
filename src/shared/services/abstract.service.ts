import { Model, Repository } from 'sequelize-typescript';
import { Injectable, NotFoundException } from '@nestjs/common';
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
import { RecourseNotExistsException } from '../../exceptions/recourse-not-exists.exception';

@Injectable()
export default abstract class AbstractService<T extends Model<T>> implements IAbstractService<T> {
  protected constructor(private readonly repository: Repository<T>) {}

  // @ts-ignore
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
  ): Promise<{
    data: T[],
    limit: number,
    offset: number,
    count: number
  }> {
    try {
      const data = await this.repository.findAll({
        where,
        order,
        attributes,
        offset,
        limit,
        include,
        raw,
      });

      return {
         data,
         limit,
         offset,
         count: 100 //todo
      }
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
      this.throwError("GET", e)

    }
  }

  async findOrCreate(entity: object, where: WhereOptions = {}, transaction?: Transaction): Promise<T> {
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
      this.throwError("FIND_OR_CREATE", e);
    }
  }


  async create(entity: object): Promise<T> {
    try {
      return await this.repository.create(entity);
    } catch (e) {
      this.throwError("CREATE", e)
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
    const data =  await this.repository.findOne({ where: findData });
    if(!data){
      throw new RecourseNotExistsException("Data")
    }
    return data;
  }

  throwError(operationName, e){
    console.error(`Error: CRUD service - ${this.repository.name}[${operationName}]: ${e}`);
    throw new BaseException(e)
  }
}
