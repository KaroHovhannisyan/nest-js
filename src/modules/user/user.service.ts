import { Inject, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { User } from '../../models/User';
import { UserDto } from './dto/UserDto';
import { ValidatorService } from '../../shared/services/validator.service';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { UserUpdateDto } from './dto/UserUpdateDto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
    public readonly validatorService: ValidatorService,
  ) {}

  /**
   * Find single user
   */
  async findOne(findData: any): Promise<UserDto | null> {
    return await this.userRepository.findOne({ where: findData });
  }

  /**
   * Update User
   * @param id
   * @param newValues
   */

  async updateById(id: number, newValues: any): Promise<User | null> {
    //todo
    return await this.userRepository.update(newValues, {
      returning: true,
      where: { id },
    });
  }

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.userRepository.create<User>(userRegisterDto);
  }

  async changeUserProfile(user: User, data: any): Promise<User> {
    // todo
    await this.updateById(user.id, data);
    return data;
  }

  async uploadImage(user, file): Promise<any> {
    let imageUrl: string | null;
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }
    if (file) {
      console.log(file);
    }
    //todo
    imageUrl =
      'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png';
    // await this.updateById(user.id, {imageUrl});
    return imageUrl;
  }
}
