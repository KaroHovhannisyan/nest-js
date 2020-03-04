import { Inject, Injectable } from '@nestjs/common';
import moment = require('moment');
import { Users_Tokens } from '../../models/Users_Tokens';
import { UserDto } from '../../modules/user/dto/UserDto';
import { User } from '../../models/User';

@Injectable()
export class TokenService {
  constructor(
    @Inject('Users_Tokens')
    private readonly usersTokensRepo: typeof Users_Tokens,
  ) {}

  async create(userId, tokenInfo, reason): Promise<Users_Tokens> {
    let attributes = {
      userId,
      token: tokenInfo.token,
      expiration: moment(tokenInfo.exp).format('YYYY-MM-DD HH:mm:ss'),
      reason,
    };

    return await this.usersTokensRepo.create(attributes);

    // return Tokens.query().insertAndFetch(attributes);
  }

  async removeById(id): Promise<UserDto | null> {
    return await this.usersTokensRepo.destroy({ where: { id } });
  }

  async findOne(findData: any): Promise<UserDto | null> {
    return await this.usersTokensRepo.findOne({ where: findData });
  }

  public async getByTokenAndReason(token, reason): Promise<any> {
    return await this.findOne({ token, reason });
  }
}
