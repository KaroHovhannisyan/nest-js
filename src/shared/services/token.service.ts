import { Inject, Injectable } from '@nestjs/common';
import moment = require('moment');
import { Users_Tokens } from '../../models/Users_Tokens';

@Injectable()
export class TokenService {
  constructor(
    // @Inject('Users_Tokens')
    // private readonly usersTokensRepo: typeof Users_Tokens,
  ) {}

  async create(userId, tokenInfo, reason) {
    let attributes = {
      userId,
      token: tokenInfo.token,
      expiration: moment(tokenInfo.exp).format("YYYY-MM-DD HH:mm:ss"),
      reason
    };

    console.log(attributes)

    // return Tokens.query().insertAndFetch(attributes);
  }

  static removeById(id){
    // return Tokens.query().deleteById(id)
  }

  static async getByTokenAndReason(token, reason) {
    // return Tokens.query()
    //   .eager("user")
    //   .where("token", token)
    //   .andWhere("reason", reason)
    //   .first();
  }
}
