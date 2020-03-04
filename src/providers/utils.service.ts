import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { uid } from 'rand-token';
import * as moment from 'moment';
import { IToken } from '../interfaces/IToken';
import { Global } from '@nestjs/common';
import { Injectable } from '@nestjs/common/interfaces';

@Global()
export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  public toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: any,
  ): T;
  public toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: any,
  ): T[];
  public toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E | E[],
    options?: any,
  ): T | T[] {
    if (_.isArray(entity)) {
      // @ts-ignore
      return entity.map(u => new model(u, options));
    }
    // @ts-ignore
    return new model(entity, options);
  }

  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * generate random string
   * @param length
   */
  static generateRandomString(length: number) {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .substr(0, length);
  }
  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  /**
   * @description Create simple token for with expiration date
   * @param expirationHours
   * @param size
   * @param unit
   * @return {{exp: *, token: *}}
   */
  createToken(expirationHours = 20, size = 20, unit = 'minutes'): IToken {
    return {
      token: uid(size),
      // exp: moment().add(expirationHours, unit).valueOf()
    };
  }
}
