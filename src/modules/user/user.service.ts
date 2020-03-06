import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/User';
import { IFile } from '../../interfaces/IFile';
import { AbstractService } from '../../shared/services';
import { USER_REPOSITORY } from '../../common/constants';

@Injectable()
export class UserService extends AbstractService<User>{
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {
    super(userRepository);
  }

  async changeUserProfile(user: User, data: User): Promise<User> {
    await this.update(user.id, data);
    return data;
  }

  async uploadImage(user: User, file: IFile): Promise<string> {
    await this.update(user.id, {imageUrl: `${file.path}`});
    return file.path;
  }
}
